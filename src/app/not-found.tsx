"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft, Phone } from "lucide-react";

const QUICK_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Log in" },
  { href: "/register", label: "Sign up" },
  { href: "/caller", label: "Request Emergency" },
];

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-destructive/20 blur-3xl" />
            <FileQuestion className="relative h-32 w-32 text-destructive" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight text-foreground">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <div className="border-t border-border pt-8">
          <p className="mb-4 text-sm text-muted-foreground">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href="tel:999"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-destructive hover:opacity-90"
          >
            <Phone className="h-4 w-4" />
            Emergency? Call 999
          </a>
        </div>
      </div>
    </div>
  );
}
