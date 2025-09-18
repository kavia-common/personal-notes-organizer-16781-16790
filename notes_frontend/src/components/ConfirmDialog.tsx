"use client";

import React from "react";
import { theme } from "@/styles/theme";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Confirm action">
      <div className="modal max-w-md">
        <div className="p-4">
          <h3 className="text-lg font-semibold" style={{ color: theme.colors.text }}>
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-700">{message}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button className="btn btn-ghost" onClick={onCancel}>{cancelText}</button>
            <button
              className="btn"
              style={{ background: theme.colors.error, color: "white" }}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
