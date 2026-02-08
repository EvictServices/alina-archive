"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const existingFooter = document.getElementById("alina-footer");
    if (
      existingFooter &&
      document.querySelectorAll("#alina-footer").length > 1
    ) {
      setShouldRender(false);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <footer
      id="alina-footer"
      className="border-t border-white/10 backdrop-blur-xl bg-white/[0.02] w-full relative z-10 font-sans mt-auto text-white"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center w-full gap-2">
            <div className="text-sm font-normal">
              <Link
                href="https://azron.net"
                className="hover:text-white transition-colors"
              >
                Part of Azron Network
              </Link>
            </div>
            <div className="text-sm font-normal text-center">
              Copyright © 2026 evict.bot. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
              <Link
                href="/invite"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Invite
              </Link>
              <Link
                href="https://docs.evict.bot/"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="https://discord.gg/evict"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Support
              </Link>
              <Link
                href="/terms"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
