// client.tsx
"use client";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

// Client wraps any client/rsc components with AnimatePresence
export default function Client({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent();
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5 } }}
        exit={{ scaleX: 1, transition: { duration: 0.5 } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />

      {children}
    </AnimatePresence>
  );
}
