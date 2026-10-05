"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Plus,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { useLogout } from "@/hooks";
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
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const roleLabel = user ? ROLE_LABELS[user.role] : undefined;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        // Clear all local storage
        localStorage.clear();
        sessionStorage.clear();

        toast.add({
          type: "success",
          title: "Logged out successfully",
          description: "You have been logged out of your account",
        });

        router.push("/login");

        // Force page reload to clear all state
        router.refresh();
      },
      onError: (error: any) => {
        toast.add({
          type: "error",
          title: "Logout failed",
          description: error?.message || "Failed to logout. Please try again.",
        });
      },
    });
  };

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

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-lg px-1.5 py-1"
              />
            }
          >
            <Avatar className="size-8">
              <AvatarImage src={undefined} alt={user?.name} />
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
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name ?? "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email ?? ""}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(profileHref)}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="destructive"
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
