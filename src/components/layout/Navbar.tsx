"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ambulance, Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/hospitals", label: "Hospitals" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
        >
          <Ambulance className="h-5 w-5 text-destructive" />
          <span>Rescue</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:999"
            className="flex items-center gap-1.5 text-sm font-medium text-destructive hover:opacity-90"
          >
            <Phone className="h-4 w-4" />
            999
          </a>

          <span className="h-4 w-px bg-border" />

          {/* Dark/Light Theme Toggle */}
          <ThemeToggle />

          <span className="h-4 w-px bg-border" />

          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Log in
          </Button>

          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/register" />}
          >
            Sign up
          </Button>
        </div>

        {/* Mobile Actions & Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {open && (
        <div className="border-b border-border bg-background px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-border pt-4">
            <a
              href="tel:999"
              className="flex items-center gap-1.5 text-sm font-medium text-destructive"
            >
              <Phone className="h-4 w-4" />
              Call 999
            </a>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<Link href="/login" onClick={() => setOpen(false)} />}
            >
              Log in
            </Button>
            <Button
              className="w-full"
              nativeButton={false}
              render={<Link href="/register" onClick={() => setOpen(false)} />}
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
