"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Ambulance, LogOut, Phone, Siren, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import type { SidebarItem, SidebarItems } from "@/types";

function isActive(pathname: string, href: string, exact?: boolean) {
  if (pathname === href) {
    return true;
  }
  if (exact) {
    return false;
  }
  return pathname.startsWith(`${href}/`);
}

function NavItem({
  href,
  label,
  icon: Icon,
  exact,
  pathname,
  onNavigate,
}: SidebarItem & {
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = isActive(pathname, href, exact);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0",
          active
            ? "text-sidebar-primary"
            : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground",
        )}
      />
      <span className="flex-1 truncate">{label}</span>
    </Link>
  );
}

export function DashboardSidebar({
  routes,
  open,
  onClose,
}: {
  routes: SidebarItems;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out",
          description: "Logged out successfully",
          type: "success",
        });

        queryClient.removeQueries({ queryKey: ["user"] });
        onClose();
        router.replace("/login");
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

  const content = (
    <>
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
          <Ambulance className="size-5" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
            Rescue
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-widest text-sidebar-foreground/50">
            Dispatch Console
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close sidebar"
          className="ml-auto text-sidebar-foreground/70 lg:hidden"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Menu
        </p>
        {routes.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            pathname={pathname}
            onNavigate={onClose}
          />
        ))}
      </nav>

      {/* Emergency + footer */}
      <div className="space-y-3 border-t border-sidebar-border px-3 py-4">
        <a
          href="tel:999"
          className="flex items-center justify-center gap-2 rounded-lg bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
        >
          <Siren className="size-4" />
          Emergency Dispatch · 999
        </a>
        <Separator className="bg-sidebar-border" />
        <div className="flex items-center gap-2 px-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-start px-2 text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <Phone className="size-3.5" />
            Support line
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Log out"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        {content}
      </aside>
    </>
  );
}
