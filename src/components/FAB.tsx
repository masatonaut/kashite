"use client";

import { Plus } from "lucide-react";

interface FABProps {
  isOpen: boolean;
  onClick: () => void;
}

export function FAB({ isOpen, onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-8 right-5
        w-14 h-14 rounded-full
        bg-accent hover:bg-accent-hover
        text-white
        flex items-center justify-center
        shadow-[0_4px_16px_rgba(232,93,58,0.4)]
        transition-transform duration-fast
        animate-fab-enter
      "
      style={{
        transform: isOpen ? "rotate(45deg)" : "rotate(0)",
      }}
      aria-label={isOpen ? "閉じる" : "追加"}
    >
      <Plus size={24} strokeWidth={2} />
    </button>
  );
}
