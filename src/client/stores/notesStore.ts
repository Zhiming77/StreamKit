import { create } from "zustand";
import type { StreamNote, NoteTag } from "../types/notes";

function formatTime(sec: number): string {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${String(s).padStart(2, "0")}`;
    }
let nextId = 1;

interface NoteState {
  notes: StreamNote[];
  isRecording: boolean;
  streamStartTime: number | null;

  addNote: (tag: NoteTag, content?: string) => void;
  removeNote: (id: number) => void;
  startRecording: () => void;
  stopRecording: () => void;
  clearSession: () => void;
  getNotesForExport: () => string;
}

export const useNotesStore = create<NoteState>((set, get) => ({
  notes: [],
  isRecording: false,
  streamStartTime: null,

  addNote: (tag: NoteTag, content?: string) => {
    const { isRecording, streamStartTime } = get();
    if (!isRecording || streamStartTime === null) return;

    const elapsedSec = Math.floor((Date.now() - streamStartTime) / 1000);

    const note: StreamNote = {
      id: nextId++,
      sessionId: 0,
      timestamp: new Date(),
      elapsedSec,
      tag,
      content: content ?? "",
      createdAt: new Date(),
    };

    set((state) => ({ notes: [...state.notes, note] }));
  },

  removeNote: (id: number) => {
    set((state) => {
      const updated = state.notes.filter((note) => note.id !== id);
      return { notes: updated };
    });
  },

  startRecording: () => {
    set({ isRecording: true, streamStartTime: Date.now() });
  },

  stopRecording: () => {
    set({ isRecording: false });
  },

  clearSession: () => {
    set({ notes: [], isRecording: false, streamStartTime: null });
  },

  getNotesForExport: () => {
    const { notes } = get();
    if (notes.length === 0) return "No notes recorded";

    

    const lines = notes
      .sort((a, b) => a.elapsedSec - b.elapsedSec)
      .map((n) => `- [${formatTime(n.elapsedSec)}] **${n.tag}** ${n.content}`);

      return `# Stream Notes\n\n${lines.join("\n")}`;
  },
}));
