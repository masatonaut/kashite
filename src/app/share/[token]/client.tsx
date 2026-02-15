"use client";

import { useState } from "react";

export function SharePageClient() {
  const [showToast, setShowToast] = useState(false);

  const handleReturn = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <button
        onClick={handleReturn}
        style={{
          width: "100%",
          padding: "14px 24px",
          background: "#E85D3A",
          color: "#FFFFFF",
          fontSize: "15px",
          fontWeight: 500,
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          transition: "background 150ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#D54E2C")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#E85D3A")}
      >
        返却したよ
      </button>

      {/* Toast notification */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1A1A1A",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
            animation: "fade-up 350ms cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 50,
          }}
        >
          ありがとう！貸主に伝えておくね
        </div>
      )}
    </>
  );
}
