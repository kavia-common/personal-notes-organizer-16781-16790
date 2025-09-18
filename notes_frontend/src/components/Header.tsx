"use client";

import React from "react";
import { theme } from "@/styles/theme";

type HeaderProps = {
  onSearch?: (q: string) => void;
};

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header
      className="w-full sticky top-0 z-40"
      style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "saturate(180%) blur(8px)" }}
      aria-label="Application header with user menu and search"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="h-9 w-9 rounded-2xl"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, ${theme.colors.primary}, ${theme.colors.secondary})`,
              boxShadow: "0 8px 18px rgba(236, 72, 153, 0.35)",
            }}
            aria-hidden
          />
          <span className="text-lg font-semibold" style={{ color: theme.colors.text }}>
            Ocean Notes
          </span>
        </div>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-3">
          <input
            aria-label="Search notes"
            placeholder="Search notes..."
            className="input w-72"
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <button className="btn btn-secondary" aria-label="New features soon" title="Coming soon">✨</button>
        </div>

        <button
          className="ml-2 flex items-center gap-2 btn btn-ghost"
          aria-haspopup="menu"
          aria-label="User menu"
          title="User menu"
        >
          <div
            className="h-8 w-8 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
            }}
          />
          <span className="hidden sm:block">You</span>
        </button>
      </div>
    </header>
  );
};
