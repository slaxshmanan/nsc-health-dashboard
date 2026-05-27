"use client";

export default function AskNSCAIButton() {
  const notebookUrl = process.env.NEXT_PUBLIC_NOTEBOOKLM_URL;

  return (
    <button
      onClick={() => {
        if (!notebookUrl) {
          alert("NotebookLM link is missing.");
          return;
        }

        window.open(notebookUrl, "_blank", "noopener,noreferrer");
      }}
      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
    >
      Ask NSC AI
    </button>
  );
}