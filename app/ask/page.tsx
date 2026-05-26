"use client";

import { useState } from "react";
import Header from "../../components/Header";

const exampleQuestions = [
  "What are social determinants of health?",
  "Which sources explain Virginia county health metrics?",
  "How are food insecurity and diabetes related to community health?",
  "What data sources can be used to understand healthcare access in Virginia?",
];

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askQuestion(input?: string) {
    const finalQuestion = input || question;
    if (!finalQuestion.trim()) return;

    setQuestion(finalQuestion);
    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: finalQuestion }),
    });

    const data = await res.json();

    if (data.answer) {
      setAnswer(data.answer);
    } else {
      setAnswer(data.error || "Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Source-grounded assistant
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Ask NSC AI
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Ask public health questions grounded in approved Virginia and national
            health data sources.
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {exampleQuestions.map((item) => (
              <button
                key={item}
                onClick={() => askQuestion(item)}
                className="rounded-2xl border bg-slate-50 p-4 text-left text-sm text-slate-700 hover:bg-slate-100"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border bg-slate-50 p-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about Virginia health equity, county metrics, chronic disease, healthcare access, or social determinants..."
              className="h-36 w-full resize-none rounded-xl border bg-white p-4 text-slate-900 outline-none"
            />

            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Answers are generated from approved source documents.
              </p>

              <button
                onClick={() => askQuestion()}
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Thinking..." : "Ask"}
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
              <div className="h-4 w-2/3 rounded bg-slate-200" />
            </div>
          </div>
        )}

        {answer && !loading && (
          <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Answer
            </h2>

            <div className="whitespace-pre-wrap leading-7 text-slate-800">
              {answer}
            </div>
          </div>
        )}

        <p className="mt-6 text-sm text-slate-500">
          This tool summarizes approved public health sources and is not medical advice.
        </p>
      </section>
    </main>
  );
}