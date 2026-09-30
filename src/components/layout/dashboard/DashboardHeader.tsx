"use client";

import { Bell, ChevronDown, Menu, Plus, Search } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { AuthUser, UserRole } from "@/types";

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Administrator",
  DISPATCHER: "Dispatcher",
  DRIVER: "Driver",
  CALLER: "Caller",
};

function getInitials(name?: string) {
  if (!name) {
    return "?";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function DashboardHeader({
  user,
  profileHref,
  onMenuClick,
}: {
  user?: AuthUser;
  profileHref: string;
  onMenuClick: () => void;
}) {
  const roleLabel = user ? ROLE_LABELS[user.role] : undefined;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      {/* Mobile menu trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="lg:hidden"
      >
        <Menu className="size-5" />
      </Button>

      {/* Search */}
      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search trips, drivers, bookings…"
          className="pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Quick action */}
        <Button size="sm" className="hidden sm:inline-flex">
          <Plus data-icon="inline-start" />
          New Dispatch
        </Button>

        <ThemeToggle />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Profile */}
        <Link
          href={profileHref}
          className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-accent"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden flex-col leading-tight md:flex">
            <span className="text-sm font-medium text-foreground">
              {user?.name ?? "Signed in"}
            </span>
            <span className="text-xs text-muted-foreground">
              {roleLabel ?? "—"}
            </span>
          </span>
          <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
        </Link>
      </div>
    </header>
  );
}
