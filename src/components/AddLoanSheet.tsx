"use client";

import { useState, useRef, useCallback, useEffect, type FormEvent } from "react";
import { createLoanSchema, type CreateLoanInput } from "@/lib/validations";
import { JA } from "@/constants/ja";

interface AddLoanSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLoanInput) => Promise<void>;
}

export function AddLoanSheet({ isOpen, onClose, onSubmit }: AddLoanSheetProps) {
  const [itemName, setItemName] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  const [memo, setMemo] = useState("");
  const [lentAt, setLentAt] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setItemName("");
      setBorrowerName("");
      setMemo("");
      setLentAt(new Date().toISOString().split("T")[0]);
      setErrors({});
    }
  }, [isOpen]);

  const handleDragStart = useCallback((y: number) => {
    dragStartY.current = y;
    isDragging.current = true;
  }, []);

  const handleDragMove = useCallback((y: number) => {
    if (!isDragging.current || !sheetRef.current) return;
    const diff = y - dragStartY.current;
    if (diff > 0) {
      currentY.current = diff;
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false;

    if (currentY.current > 100) {
      onClose();
    } else {
      sheetRef.current.style.transform = "translateY(0)";
    }
    currentY.current = 0;
  }, [onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = createLoanSchema.safeParse({
        item_name: itemName,
        borrower_name: borrowerName,
        memo: memo || undefined,
        lent_at: new Date(lentAt),
      });

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      await onSubmit(result.data);
      onClose();
    } catch {
      setErrors({ submit: JA.ERROR_GENERIC });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary rounded-t-[20px] shadow-lg animate-slide-up"
        style={{ transition: isDragging.current ? "none" : "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Drag handle */}
        <div
          className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => handleDragStart(e.clientY)}
          onMouseMove={(e) => handleDragMove(e.clientY)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div className="w-9 h-1 bg-text-tertiary/40 rounded-full" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 pb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-6">
            {JA.ADD_TITLE}
          </h2>

          {/* Item name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {JA.ADD_ITEM_LABEL}
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder={JA.ADD_ITEM_PLACEHOLDER}
              maxLength={100}
              className={`
                w-full px-4 py-3 rounded-xl
                bg-bg-secondary border border-border
                text-text-primary placeholder:text-text-tertiary
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                transition-all duration-fast
                ${errors.item_name ? "border-error ring-error/30" : ""}
              `}
            />
            {errors.item_name && (
              <p className="mt-1 text-xs text-error">{errors.item_name}</p>
            )}
          </div>

          {/* Borrower name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {JA.ADD_BORROWER_LABEL}
            </label>
            <input
              type="text"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              placeholder={JA.ADD_BORROWER_PLACEHOLDER}
              maxLength={50}
              className={`
                w-full px-4 py-3 rounded-xl
                bg-bg-secondary border border-border
                text-text-primary placeholder:text-text-tertiary
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                transition-all duration-fast
                ${errors.borrower_name ? "border-error ring-error/30" : ""}
              `}
            />
            {errors.borrower_name && (
              <p className="mt-1 text-xs text-error">{errors.borrower_name}</p>
            )}
          </div>

          {/* Memo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {JA.ADD_MEMO_LABEL}
            </label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder={JA.ADD_MEMO_PLACEHOLDER}
              maxLength={500}
              rows={2}
              className="
                w-full px-4 py-3 rounded-xl
                bg-bg-secondary border border-border
                text-text-primary placeholder:text-text-tertiary
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                transition-all duration-fast resize-none
              "
            />
          </div>

          {/* Lent date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {JA.ADD_DATE_LABEL}
            </label>
            <input
              type="date"
              value={lentAt}
              onChange={(e) => setLentAt(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="
                w-full px-4 py-3 rounded-xl
                bg-bg-secondary border border-border
                text-text-primary
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                transition-all duration-fast
              "
            />
          </div>

          {/* Submit error */}
          {errors.submit && (
            <p className="mb-4 text-sm text-error text-center">{errors.submit}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full py-4 rounded-xl
              bg-accent hover:bg-accent-hover
              text-white font-semibold
              transition-colors duration-fast
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? JA.LOADING : JA.ADD_SUBMIT}
          </button>
        </form>
      </div>
    </>
  );
}
