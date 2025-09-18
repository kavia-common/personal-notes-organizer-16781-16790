"use client";

import React from "react";
import { theme } from "@/styles/theme";

type SidebarProps = {
  onNewNote: () => void;
  filters: { id: string; label: string; icon?: string }[];
  activeFilterId: string | null;
  onSelectFilter: (id: string | null) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  onNewNote,
  filters,
  activeFilterId,
  onSelectFilter,
}) => {
  return (
    <aside className="w-full md:w-64 p-3">
      <div className="surface p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold" style={{ color: theme.colors.text }}>
            Navigation
          </h2>
          <button className="btn btn-primary text-sm" onClick={onNewNote} aria-label="Create new note">
            + New
          </button>
        </div>

        <nav className="mt-4 space-y-1" aria-label="Sidebar navigation">
          <button
            className={`w-full text-left px-3 py-2 rounded-xl transition ${
              activeFilterId === null ? "bg-pink-100" : "hover:bg-pink-50"
            }`}
            onClick={() => onSelectFilter(null)}
          >
            🗂️ All Notes
          </button>
          {filters.map((f) => (
            <button
              key={f.id}
              className={`w-full text-left px-3 py-2 rounded-xl transition ${
                activeFilterId === f.id ? "bg-violet-100" : "hover:bg-violet-50"
              }`}
              onClick={() => onSelectFilter(f.id)}
              aria-current={activeFilterId === f.id ? "page" : undefined}
            >
              <span className="mr-2">{f.icon ?? "🏷️"}</span>
              {f.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="surface mt-3 p-4">
        <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>
          Tips
        </h3>
        <p className="text-sm text-gray-600">
          Use tags like #work and #ideas to keep your notes playful and organized.
        </p>
      </div>
    </aside>
  );
};
