"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Ambulance,
  Menu,
  X,
  Phone,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe, useLogout } from "@/hooks";
import { toast } from "../ui/toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getRoutesForRole } from "@/routes";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

const ROLE_LABELS = {
  ADMIN: "Administrator",
  DISPATCHER: "Dispatcher",
  DRIVER: "Driver",
  CALLER: "Caller",
} as const;

function getInitials(name?: string) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const queryClient = useQueryClient();

  const user = data?.data;
  const isLoggedIn = !!user && !isLoading;

  const dashboardRoute = user ? getRoutesForRole(user.role)[0]?.href : "/";
  const roleLabel = user?.role ? ROLE_LABELS[user.role] : undefined;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        // Clear all local storage
        localStorage.clear();
        sessionStorage.clear();

        toast.add({
          title: "Logged out successfully",
          description: "You have been logged out of your account",
          type: "success",
        });

        setOpen(false);
        router.push("/login");

        // Force page reload to clear all state
        router.refresh();
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something went wrong. Please try again.",
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
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    />
                  }
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={undefined} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        {roleLabel && (
                          <p className="text-xs leading-none text-muted-foreground">
                            {roleLabel}
                          </p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(dashboardRoute)}
                    className="cursor-pointer"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
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
            <div className="mt-4 space-y-3">
              {isLoggedIn ? (
                <>
                  <div className="rounded-lg border border-border bg-muted/50 p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={undefined}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                          {getInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                        {roleLabel && (
                          <p className="text-xs text-muted-foreground">
                            {roleLabel}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      nativeButton={false}
                      render={
                        <Link
                          href={dashboardRoute}
                          onClick={() => setOpen(false)}
                        />
                      }
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? "..." : "Logout"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex gap-3">
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
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
