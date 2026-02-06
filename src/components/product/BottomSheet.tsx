"use client";

import { X } from "lucide-react";
import React from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end justify-center lg:hidden">
      <div
        className="absolute inset-0 bg-black/60"
        role="presentation"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-screen-sm bg-zinc-950 border-t border-white/10 rounded-t-2xl shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-black uppercase tracking-[0.2em] text-sm">{title}</span>
          <button onClick={onClose} aria-label="Kapat" className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
};
