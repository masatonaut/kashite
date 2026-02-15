"use client";

import { PackageOpen } from "lucide-react";
import { JA } from "@/constants/ja";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8">
      <div className="mb-6 text-accent">
        <PackageOpen size={80} strokeWidth={1.2} />
      </div>
      <h2 className="text-lg font-semibold text-text-primary mb-2">
        {JA.EMPTY_TITLE}
      </h2>
      <p className="text-sm text-text-secondary">
        {JA.EMPTY_SUBTITLE}
      </p>
    </div>
  );
}
