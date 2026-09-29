"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Ambulance, Menu, X, Phone, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe, useLogout } from "@/hooks";
import { toast } from "../ui/toast";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const isLoggedIn = !!data && !isLoading;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out",
          description: "Logged out successfully",
          type: "success",
        });

        queryClient.removeQueries({ queryKey: ["user"] });
        setOpen(false);
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something went wrong",
          type: "error",
        });
      },
    });
  };

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
          {LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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

          <ThemeToggle />

          <span className="h-4 w-px bg-border" />

          {!isLoading &&
            (isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
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
              </>
            ))}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((value) => !value)}
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
            {LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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

          {!isLoading && (
            <div className="mt-4 flex gap-3">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    nativeButton={false}
                    render={
                      <Link href="/login" onClick={() => setOpen(false)} />
                    }
                  >
                    Log in
                  </Button>

                  <Button
                    className="w-full"
                    nativeButton={false}
                    render={
                      <Link href="/register" onClick={() => setOpen(false)} />
                    }
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
