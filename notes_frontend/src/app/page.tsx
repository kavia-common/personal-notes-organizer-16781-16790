"use client";

import React, { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { NoteCard, Note } from "@/components/NoteCard";
import { NoteModal } from "@/components/NoteModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useNotes } from "@/hooks/useNotes";

export default function Home() {
  const { notes, loading, add, update, remove, setSearch, filters } = useNotes();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Note | null>(null);

  const displayNotes = useMemo(() => {
    if (!activeFilter) return notes;
    const f = filters.find((x) => x.id === activeFilter);
    return f ? notes.filter(f.predicate) : notes;
  }, [notes, filters, activeFilter]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (n: Note) => {
    setEditing(n);
    setModalOpen(true);
  };

  const handleSubmit = async (n: Omit<Note, "updatedAt">) => {
    if (editing) {
      await update({ ...(editing as Note), ...n });
    } else {
      await add(n);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const requestDelete = (n: Note) => {
    setToDelete(n);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (toDelete) {
      await remove(toDelete.id);
    }
    setToDelete(null);
    setConfirmOpen(false);
  };

  return (
    <main className="min-h-screen">
      <Header onSearch={setSearch} />

      <div className="mx-auto max-w-7xl px-3 md:px-4 py-4 md:py-6 grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-4">
        <Sidebar
          onNewNote={openCreate}
          filters={filters.map((f) => ({ id: f.id, label: f.label }))}
          activeFilterId={activeFilter}
          onSelectFilter={setActiveFilter}
        />

        <section className="min-h-[60vh]">
          <div className="surface p-4 md:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-semibold">Your notes</h2>
              <div className="flex items-center gap-2">
                <button className="btn btn-secondary" onClick={openCreate}>+ New note</button>
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-gray-600">Loading your playful notes…</div>
            ) : displayNotes.length === 0 ? (
              <div className="py-16 text-center">
                <div className="text-5xl mb-2">🌊</div>
                <p className="text-gray-700">No notes yet. Create your first wave of ideas!</p>
                <button className="btn btn-primary mt-3" onClick={openCreate}>Create a note</button>
              </div>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {displayNotes.map((n) => (
                  <NoteCard key={n.id} note={n} onEdit={openEdit} onDelete={requestDelete} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <NoteModal
        open={modalOpen}
        initial={editing ?? undefined}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete note?"
        message="This action cannot be undone."
        onCancel={() => {
          setConfirmOpen(false);
          setToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
