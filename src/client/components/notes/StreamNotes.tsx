import { useState } from "react";
import { useNotesStore } from "../../stores/notesStore";
import { NOTE_TAGS, TAG_METADATA } from "../../types/notes";
import type { NoteTag } from "../../types/notes";

export function StreamNotes() {
  const {
    notes,
    isRecording,
    addNote,
    removeNote,
    startRecording,
    stopRecording,
    getNotesForExport,
  } = useNotesStore();

  const [customNote, setCustomNote] = useState<string>("");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Stream Notes</h1>
          {notes.length > 0 && (
            <button
              onClick={() => {
                const markdown = getNotesForExport();
                const blob = new Blob([markdown], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `stream-notes-${new Date().toISOString().split("T")[0]}.md`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="text-sm text-gray-400 hover:text-cyan-400"
            >
              Export
            </button>
          )}
        </div>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            isRecording
              ? "bg-red-500 text-white hover:bg-red-400"
              : "bg-cyan-500 text-gray-950 hover:bg-cyan-400"
          }`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-8">
        {NOTE_TAGS.map((tag) => {
          const meta = TAG_METADATA[tag];
          return (
            <button
              key={tag}
              onClick={() => addNote(tag)}
              disabled={!isRecording}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${
                isRecording
                  ? "border-gray-700 bg-gray-900 hover:border-cyan-500/50 cursor-pointer"
                  : "border-gray-800 bg-gray-900/50 opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="text-2xl">{meta.emoji}</span>
              <span className="text-xs font-medium text-gray-400">
                {meta.label}
              </span>
              <kbd className="text-xs bg-gray-950 px-1.5 py-0.5 rounded text-gray-500 font-mono">
                {meta.shortcut}
              </kbd>
            </button>
          );
        })}
      </div>
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={customNote}
          onChange={(e) => setCustomNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && customNote.trim()) {
              addNote("highlight", customNote.trim());
              setCustomNote("");
            }
          }}
          placeholder={
            isRecording
              ? "Add a custom note..."
              : "Start recording to add notes"
          }
          disabled={!isRecording}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            {isRecording
              ? "Hit a quick-tag button to bookmark a moment"
              : "Start recording to begin"}
          </p>
        ) : (
          notes
            .sort((a, b) => b.elapsedSec - a.elapsedSec)
            .map((note) => {
              const meta = TAG_METADATA[note.tag];
              return (
                <div
                  key={note.id}
                  className="flex items-center gap-4 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg group"
                >
                  <span className="font-mono text-sm text-gray-500 w-16">
                    {Math.floor(note.elapsedSec / 60)}:
                    {String(note.elapsedSec % 60).padStart(2, "0")}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${meta.color}20`,
                      color: meta.color,
                    }}
                  >
                    {meta.label}
                  </span>
                  <span className="flex-1 text-sm text-gray-100">
                    {note.content}
                  </span>
                  <button
                    onClick={() => removeNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 text-xs"
                  >
                    remove
                  </button>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
