"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ambulance, Menu, X, Phone } from "lucide-react";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/become-a-driver", label: "Become a driver" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#151A1E]/10 bg-[#F5F6F4]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-[Archivo_Condensed,'Barlow_Condensed',sans-serif] text-xl font-bold tracking-tight text-[#151A1E]"
        >
          <Ambulance className="h-5 w-5 text-[#D8272C]" />
          Rescue
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#151A1E]/70 transition-colors hover:text-[#151A1E]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:999"
            className="flex items-center gap-1.5 text-sm font-medium text-[#D8272C]"
          >
            <Phone className="h-4 w-4" />
            999
          </a>
          <span className="h-5 w-px bg-[#151A1E]/10" />
          <Link
            href="/login"
            className="text-sm font-medium text-[#151A1E]/70 hover:text-[#151A1E]"
          >
            Log in
          </Link>
          <Button
            asChild
            className="h-9 rounded-md bg-[#D8272C] px-4 text-sm font-medium hover:bg-[#7A1418]"
          >
            <Link href="/register">Sign up</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#151A1E] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#151A1E]/10 bg-[#F5F6F4] px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-[#151A1E]/80 hover:bg-[#151A1E]/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-3 border-t border-[#151A1E]/10 pt-4">
            <a
              href="tel:999"
              className="flex items-center gap-1.5 text-sm font-medium text-[#D8272C]"
            >
              <Phone className="h-4 w-4" />
              Call 999
            </a>
          </div>

          <div className="mt-3 flex gap-3">
            <Button
              variant="outline"
              className="h-10 flex-1 rounded-md border-[#151A1E]/20 text-sm font-medium"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              className="h-10 flex-1 rounded-md bg-[#D8272C] text-sm font-medium hover:bg-[#7A1418]"
            >
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}