import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /**
   * When true the item only highlights on an exact pathname match. Use it for
   * parent routes (e.g. "/caller") so they don't stay active on their children.
   */
  exact?: boolean;
}

export type SidebarItems = SidebarItem[];
