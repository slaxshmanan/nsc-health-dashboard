import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

function scoreDocument(question: string, doc: any) {
  const q = question.toLowerCase();
  const text = `${doc.title} ${doc.content} ${doc.source_url}`.toLowerCase();

  let score = 0;

  const terms = q
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3);

  for (const term of terms) {
    if (text.includes(term)) score += 2;
  }

  const topicBoosts: Record<string, string[]> = {
    virginia: ["virginia", "vdh", "vhi"],
    county: ["county", "places", "rankings"],
    diabetes: ["diabetes", "chronic disease"],
    obesity: ["obesity", "chronic disease"],
    heart: ["heart disease", "cardiovascular"],
    unemployment: ["unemployment", "bls"],
    poverty: ["poverty", "acs", "census"],
    broadband: ["broadband", "acs", "census"],
    medicaid: ["medicaid", "cms"],
    shortage: ["shortage", "hrsa", "primary care"],
    food: ["food insecurity", "social determinants"],
    determinants: ["social determinants", "health equity"],
    equity: ["health equity", "disparities"],
  };

  for (const [topic, boosts] of Object.entries(topicBoosts)) {
    if (q.includes(topic)) {
      for (const boost of boosts) {
        if (text.includes(boost)) score += 5;
      }
    }
  }

  return score;
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Question is required." }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!geminiKey) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !serviceRoleKey) {
      return Response.json(
        { error: "Missing Supabase server environment variables." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: geminiKey,
    });

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: docs, error } = await supabase
      .from("source_documents")
      .select("title, source_url, content");

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const rankedDocs = (docs || [])
      .map((doc) => ({
        ...doc,
        score: scoreDocument(question, doc),
      }))
      .sort((a, b) => b.score - a.score);

    const selectedDocs = rankedDocs.filter((doc) => doc.score > 0).slice(0, 6);

    const finalDocs =
      selectedDocs.length > 0 ? selectedDocs : rankedDocs.slice(0, 5);

    const sourceText = finalDocs
      .map(
        (doc, index) => `
SOURCE ${index + 1}
Title: ${doc.title}
URL: ${doc.source_url}
Content:
${doc.content}
`
      )
      .join("\n\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
You are the NSC Community Health Intelligence AI assistant.

Answer using ONLY the selected source documents below.
Do not use outside knowledge.
If the answer is not supported by the source documents, say that clearly.
Prioritize Virginia-specific sources when available.
Be concise, polished, and understandable for the public.
When comparing metrics, explain what the metric means and why it matters.
End with a "Sources used" section listing the source titles and URLs.

Selected source documents:
${sourceText}

User question:
${question}
`,
    });

    return Response.json({ answer: response.text });
  } catch (error: any) {
    console.error("Ask API error:", error);

    return Response.json(
      { error: "AI request failed.", details: error?.message },
      { status: 500 }
    );
  }
}