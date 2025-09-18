"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Note } from "@/components/NoteCard";
import { createNote, deleteNote, listNotes, searchNotes, updateNote } from "@/services/notesApi";
import type { NoteDTO } from "@/services/notesApi";

export type Filter = { id: string; label: string; predicate: (note: Note) => boolean };

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await (query ? searchNotes(query) : listNotes());
    setNotes(data as Note[]);
    setLoading(false);
  }, [query]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    async (n: Omit<Note, "updatedAt">) => {
      await createNote(n as unknown as Omit<NoteDTO, "updatedAt">);
      await refresh();
    },
    [refresh]
  );

  const update = useCallback(
    async (n: Note) => {
      await updateNote(n as unknown as NoteDTO);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(async (id: string) => {
    await deleteNote(id);
    await refresh();
  }, [refresh]);

  const setSearch = useCallback((q: string) => setQuery(q), []);

  const filters: Filter[] = useMemo(
    () => [
      { id: "work", label: "Work", predicate: (n) => n.tags.includes("work") },
      { id: "personal", label: "Personal", predicate: (n) => n.tags.includes("personal") },
      { id: "ideas", label: "Ideas", predicate: (n) => n.tags.includes("idea") || n.tags.includes("ideas") },
    ],
    []
  );

  return { notes, loading, add, update, remove, setSearch, filters };
}
