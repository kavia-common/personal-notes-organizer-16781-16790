"use client";

import React from "react";
import { theme } from "@/styles/theme";

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
  color?: string;
};

type NoteCardProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const color = note.color ?? theme.colors.secondary;

  return (
    <article
      className="surface p-4 flex flex-col gap-3 group"
      style={{
        borderTopLeftRadius: "18px",
        borderTopRightRadius: "18px",
        borderBottomLeftRadius: "14px",
        borderBottomRightRadius: "14px",
        borderTop: `6px solid ${color}`,
      }}
      aria-label={`Note titled ${note.title}`}
    >
      <header className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-800">{note.title || "Untitled"}</h3>
        <div className="opacity-0 group-hover:opacity-100 transition">
          <button className="btn btn-ghost text-sm" onClick={() => onEdit(note)} aria-label="Edit note">
            ✏️
          </button>
          <button
            className="btn btn-ghost text-sm"
            onClick={() => onDelete(note)}
            aria-label="Delete note"
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </header>

      <p className="text-sm text-gray-600 line-clamp-4 whitespace-pre-wrap">
        {note.content || "No content yet. Click edit to start typing something amazing!"}
      </p>

      <footer className="flex items-center justify-between pt-2">
        <div className="flex flex-wrap gap-1">
          {note.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-xs"
              style={{
                background: "rgba(236,72,153,0.12)",
                border: "1px solid rgba(236,72,153,0.35)",
                color: theme.colors.primary,
              }}
            >
              #{t}
            </span>
          ))}
        </div>
        <time className="text-xs text-gray-500" dateTime={note.updatedAt}>
          {new Date(note.updatedAt).toLocaleString()}
        </time>
      </footer>
    </article>
  );
};
