"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { X, Copy, Check, Share2, MessageCircle } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareToken: string;
  itemName: string;
  borrowerName: string;
}

function useCanShare(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && !!navigator.share,
    () => false
  );
}

export function ShareModal({
  isOpen,
  onClose,
  shareToken,
  itemName,
  borrowerName,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const canShare = useCanShare();

  const shareUrl = `https://kashite.app/share/${shareToken}`;
  const shareMessage = `${borrowerName}さん、${itemName}を借りてませんか？返してね！`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const handleNativeShare = useCallback(async () => {
    try {
      await navigator.share({
        title: `${itemName} — KASHITE`,
        text: shareMessage,
        url: shareUrl,
      });
    } catch (error) {
      // User cancelled or share failed
      if ((error as Error).name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  }, [itemName, shareMessage, shareUrl]);

  const handleLineShare = useCallback(() => {
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareMessage + "\n" + shareUrl)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  }, [shareMessage, shareUrl]);

  const handleXShare = useCallback(() => {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(xUrl, "_blank", "noopener,noreferrer");
  }, [shareMessage, shareUrl]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 40,
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--bg-primary, #FAFAF8)",
          borderRadius: "16px 16px 0 0",
          padding: "24px 20px",
          paddingBottom: "max(24px, env(safe-area-inset-bottom))",
          zIndex: 50,
          animation: "slide-up 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: "36px",
            height: "4px",
            background: "var(--border, #E5E3DE)",
            borderRadius: "2px",
            margin: "0 auto 20px",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            className="font-heading"
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--text-primary, #1A1A1A)",
            }}
          >
            返却リクエストを送信
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary, #6B6B6B)",
            }}
            aria-label="閉じる"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* URL display */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            background: "var(--bg-secondary, #F2F0EB)",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            value={shareUrl}
            readOnly
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              fontSize: "13px",
              color: "var(--text-secondary, #6B6B6B)",
              outline: "none",
            }}
          />
          <button
            onClick={handleCopy}
            style={{
              padding: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: copied ? "var(--success, #4CAF82)" : "var(--text-secondary, #6B6B6B)",
              transition: "color 150ms",
            }}
            aria-label={copied ? "コピーしました" : "リンクをコピー"}
          >
            {copied ? <Check size={18} strokeWidth={1.5} /> : <Copy size={18} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Share buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {canShare && (
            <button
              onClick={handleNativeShare}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "14px 24px",
                background: "var(--accent, #E85D3A)",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 500,
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                transition: "background 150ms",
              }}
            >
              <Share2 size={18} strokeWidth={1.5} />
              シェアする
            </button>
          )}

          {!canShare && (
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleLineShare}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "14px 16px",
                  background: "#06C755",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                LINE
              </button>
              <button
                onClick={handleXShare}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "14px 16px",
                  background: "#000000",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                X
              </button>
              <button
                onClick={handleCopy}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "14px 16px",
                  background: "var(--bg-secondary, #F2F0EB)",
                  color: "var(--text-primary, #1A1A1A)",
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {copied ? <Check size={18} strokeWidth={1.5} /> : <Copy size={18} strokeWidth={1.5} />}
                {copied ? "コピー済" : "コピー"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animation keyframes - injected via style tag */}
      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
