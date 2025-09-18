"use client";

/**
 * PUBLIC_INTERFACE
 * listNotes
 * createNote
 * updateNote
 * deleteNote
 * searchNotes
 *
 * This module provides a localStorage-backed mock API for notes and is written
 * to be easily replaced with real HTTP calls to a backend service later.
 */

export type NoteDTO = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  color?: string;
  updatedAt: string;
};

const STORAGE_KEY = "ocean-notes-v1";

function read(): NoteDTO[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as NoteDTO[]) : [];
  } catch {
    return [];
  }
}

function write(data: NoteDTO[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// PUBLIC_INTERFACE
export async function listNotes(): Promise<NoteDTO[]> {
  return read().sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

// PUBLIC_INTERFACE
export async function createNote(note: Omit<NoteDTO, "updatedAt">): Promise<NoteDTO> {
  const now = new Date().toISOString();
  const created: NoteDTO = { ...note, updatedAt: now };
  const all = read();
  write([created, ...all]);
  return created;
}

// PUBLIC_INTERFACE
export async function updateNote(note: NoteDTO): Promise<NoteDTO> {
  const all = read();
  const idx = all.findIndex((n) => n.id === note.id);
  const updated = { ...note, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    all[idx] = updated;
  } else {
    all.unshift(updated);
  }
  write(all);
  return updated;
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<void> {
  const all = read().filter((n) => n.id !== id);
  write(all);
}

// PUBLIC_INTERFACE
export async function searchNotes(q: string): Promise<NoteDTO[]> {
  const all = await listNotes();
  const s = q.trim().toLowerCase();
  if (!s) return all;
  return all.filter(
    (n) =>
      n.title.toLowerCase().includes(s) ||
      n.content.toLowerCase().includes(s) ||
      n.tags.some((t) => t.toLowerCase().includes(s))
  );
}

/**
 * Example for future backend integration:
 *
 * const BASE_URL = process.env.NEXT_PUBLIC_NOTES_API_URL;
 * export async function listNotes() {
 *   const res = await fetch(`${BASE_URL}/notes`, { cache: "no-store" });
 *   return res.json();
 * }
 */
