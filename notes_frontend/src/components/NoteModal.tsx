"use client";

import React, { useEffect, useMemo, useState } from "react";
import { theme } from "@/styles/theme";
import type { Note } from "./NoteCard";

type NoteModalProps = {
  open: boolean;
  initial?: Partial<Note>;
  onClose: () => void;
  onSubmit: (note: Omit<Note, "updatedAt">) => void;
};

export const NoteModal: React.FC<NoteModalProps> = ({ open, initial, onClose, onSubmit }) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(", "));
  const [color, setColor] = useState(initial?.color ?? theme.colors.secondary);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initial?.title ?? "");
    setContent(initial?.content ?? "");
    setTagsInput((initial?.tags ?? []).join(", "));
    setColor(initial?.color ?? theme.colors.secondary);
    setError(null);
  }, [initial, open]);

  const parsedTags = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput]
  );

  if (!open) return null;

  const handleSubmit = () => {
    if (!title.trim() && !content.trim()) {
      setError("Please add a title or some content.");
      return;
    }
    onSubmit({
      id: (initial?.id as string) ?? crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      tags: parsedTags,
      color,
    });
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Note editor">
      <div className="modal">
        <div className="p-2 md:p-4">
          <header className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold" style={{ color: theme.colors.text }}>
              {initial?.id ? "Edit Note" : "Create Note"}
            </h3>
            <button className="btn btn-ghost" onClick={onClose} aria-label="Close">✖</button>
          </header>

          {error && (
            <div
              className="mb-3 px-3 py-2 rounded-lg text-sm"
              style={{ background: "rgba(239,68,68,0.08)", color: theme.colors.error }}
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="space-y-3">
            <input
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Note title"
            />
            <textarea
              className="textarea"
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              aria-label="Note content"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Tags (comma separated)</label>
                <input
                  className="input"
                  placeholder="work, personal, idea"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  aria-label="Tags"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Color</label>
                <input
                  type="color"
                  className="input h-10 p-1"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  aria-label="Note color"
                  title="Pick a playful accent color"
                />
              </div>
            </div>
          </div>

          <footer className="mt-4 flex items-center justify-end gap-2">
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {initial?.id ? "Save Changes" : "Create Note"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
