"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { usePathname } from "next/navigation";

const HoverCard = HoverCardPrimitive;

export function MainNav() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center py-2 sm:py-4 px-2 sm:px-4 z-50">
      <nav>
        <ul
          className={`
            dynamic-island relative flex items-center gap-1 px-2 overflow-hidden
            transition-all duration-500 ease-spring
            rounded-full
            bg-white/[0.03] backdrop-blur-2xl
            border border-white/[0.08]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
            [background:linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)]
            before:absolute before:inset-0 before:rounded-[inherit]
            before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent
            before:opacity-50 before:pointer-events-none
            after:absolute after:inset-0 after:rounded-[inherit]
            after:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]
            after:pointer-events-none
            ${
              isScrolled
                ? "w-[390px] sm:w-[540px] h-10 sm:h-11"
                : "w-[360px] sm:w-[680px] h-11 sm:h-12"
            }
          `}
        >
          <div
            className={`
            absolute left-2 flex items-center transition-all duration-500
            ${
              isScrolled
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }
          `}
          >
            <Image
              src="/evict/evict.webp"
              width={16}
              height={16}
              alt="evict"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full ring-2 ring-[#D4BCD2]/20"
            />
          </div>

          <div
            className={`
            flex items-center gap-0.5 sm:gap-1 transition-all duration-500
            ${isScrolled ? "ml-9 sm:ml-10" : "ml-0"}
          `}
          >
            <li className="flex items-center h-10 sm:h-11">
              <Link
                href="/"
                className={`
                  relative px-2 sm:px-4 py-1.5 text-xs sm:text-sm transition-colors group flex items-center
                  ${
                    pathname === "/"
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground/80"
                  }
                `}
              >
                <span className="relative z-10">Home</span>
                {pathname === "/" && (
                  <span className="absolute inset-0 bg-accent/10 rounded-full" />
                )}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-accent/5 transition-opacity" />
              </Link>
            </li>

            <li className="flex items-center h-10 sm:h-11">
              <Link
                href="/commands"
                className={`
                  relative px-2 sm:px-4 py-1.5 text-xs sm:text-sm transition-colors group flex items-center
                  ${
                    pathname === "/commands"
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground/80"
                  }
                `}
              >
                <span className="relative z-10">Commands</span>
                {pathname === "/commands" && (
                  <span className="absolute inset-0 bg-accent/10 rounded-full" />
                )}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-accent/5 transition-opacity" />
              </Link>
            </li>

            <li className="flex items-center h-10 sm:h-11">
              <Link
                href="/embed"
                className={`
                  relative px-2 sm:px-4 py-1.5 text-xs sm:text-sm transition-colors group flex items-center
                  ${
                    pathname === "/embed"
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground/80"
                  }
                `}
              >
                <span className="relative z-10">Embeds</span>
                {pathname === "/embed" && (
                  <span className="absolute inset-0 bg-accent/10 rounded-full" />
                )}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-accent/5 transition-opacity" />
              </Link>
            </li>

            <li className="flex items-center h-10 sm:h-11">
              <Link
                href="/status"
                className={`
                  relative text-xs sm:text-sm transition-colors group flex items-center
                  ${
                    pathname === "/status"
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground/80"
                  }
                  ${isScrolled ? "px-2 sm:px-3" : "px-2 sm:px-4"} py-1.5
                `}
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <div className="relative flex w-1.5 sm:w-2 h-1.5 sm:h-2 shrink-0">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#D4BCD2]" />
                    <div className="absolute inset-0 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#D4BCD2] opacity-75" />
                  </div>
                  <span
                    className={`transition-transform duration-200 ${
                      isScrolled ? "w-0 opacity-0" : "w-auto opacity-100"
                    }`}
                  >
                    Status
                  </span>
                </span>
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          </div>

          <li className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/updates"
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#ccccff]/10 border border-[#ccccff]/20 flex items-center justify-center hover:bg-[#ccccff]/20 transition-colors group"
            >
              <span className="text-[10px] sm:text-xs font-medium text-[#ccccff] group-hover:text-[#ccccff] transition-colors">
                v5
              </span>
            </Link>
            
            <HoverCard.Root openDelay={100} closeDelay={100}>
              <HoverCard.Trigger asChild>
                <Link
                  href="https://discord.gg/evict"
                  className={`
                    relative inline-flex items-center justify-center
                    bg-[#ccccff] text-[#1b1919]
                    transition-all duration-300 ease-in-out overflow-hidden
                    hover:brightness-110 hover:scale-[0.98]
                    ${
                      isScrolled
                        ? "w-8 sm:w-9 h-8 sm:h-9"
                        : "w-8 sm:w-[120px] h-8 sm:h-9"
                    }
                    rounded-full mr-1
                  `}
                >
                  <div
                    className={`
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    ${
                      isScrolled
                        ? "translate-x-0 scale-100"
                        : "translate-x-0 sm:-translate-x-8 scale-100 sm:scale-0"
                    }
                  `}
                  >
                    <svg
                      width="16"
                      height="16"
                      className="sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.75.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.2 1.07 1.75.03.02.06.03.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div
                    className={`
                    absolute inset-0 items-center justify-center
                    transition-all duration-300 ease-in-out
                    hidden sm:flex
                    ${
                      isScrolled
                        ? "opacity-0 translate-x-4"
                        : "opacity-100 translate-x-0"
                    }
                  `}
                  >
                    <span className="text-[11px] leading-none sm:text-sm font-medium whitespace-nowrap tracking-tight flex items-center gap-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.75.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.2 1.07 1.75.03.02.06.03.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"
                          fill="currentColor"
                        />
                      </svg>
                      Support
                    </span>
                  </div>
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className="bg-gradient-to-br from-[#D4BCD2]/[0.07] to-transparent backdrop-blur-lg border border-[#D4BCD2]/10 p-3 sm:p-4 w-[280px] sm:w-[300px]  animate-fade-in rounded-xl"
                  sideOffset={8}
                >
                  <div className="space-y-2">
                    <h4 className="text-sm sm:text-base font-medium text-foreground">
                      Join our community
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Get help, stay updated, and connect with other Evict
                      users.
                    </p>
                  </div>
                  <HoverCard.Arrow className="fill-[#D4BCD2]/10" />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          </li>
        </ul>
      </nav>
    </div>
  );
}