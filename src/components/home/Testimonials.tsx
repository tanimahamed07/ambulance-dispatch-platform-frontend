// components/home/Testimonials.tsx
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Nusrat Jahan",
    role: "Caller",
    initials: "NJ",
    quote:
      "My father had chest pain at 2am. I requested from the app and an ICU ambulance was at our door in under 10 minutes. Being able to track it the whole time kept me calm.",
  },
  {
    id: 2,
    name: "Rafiqul Islam",
    role: "Driver",
    initials: "RI",
    quote:
      "The dispatch system tells me exactly where to go and which hospital has room. No more guessing or calling around — I just focus on driving safely.",
  },
  {
    id: 3,
    name: "Dr. Farhana Akter",
    role: "Hospital Staff",
    initials: "FA",
    quote:
      "We get patient and priority details before the ambulance even arrives, so our emergency team is ready and waiting instead of reacting at the door.",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    role: "Caller",
    initials: "TA",
    quote:
      "During an emergency near Sirajganj, getting a quick ambulance felt impossible until we used Rescue. The live GPS tracking saved us vital time.",
  },
  {
    id: 5,
    name: "Kamrul Hasan",
    role: "Paramedic",
    initials: "KH",
    quote:
      "Having real-time traffic routing and pre-notified hospital triage saves crucial golden-hour minutes for critical cardiac patients.",
  },
  {
    id: 6,
    name: "Sabrina Chowdhury",
    role: "Caller",
    initials: "SC",
    quote:
      "The transparent fare estimation before ordering meant zero hassle or bargaining during a high-stress medical emergency.",
  },
];

function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setItemsPerPage(mql.matches ? 3 : 1);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return itemsPerPage;
}

export default function Testimonials() {
  const itemsPerPage = useItemsPerPage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage);

  // keep currentIndex valid when itemsPerPage changes (e.g. resize across breakpoint)
  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, totalPages - 1));
  }, [totalPages]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, totalPages]);

  const visibleTestimonials = TESTIMONIALS.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage,
  );

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              From the people who use it
            </h2>
            <p className="mt-3 text-muted-foreground">
              Callers, drivers, and hospital staff — everyone on the same
              platform.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={isAutoPlaying ? "Pause" : "Play"}
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Play className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              onClick={handlePrev}
              title="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              onClick={handleNext}
              title="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Items Grid */}
        <div className="relative overflow-x-clip">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={`${itemsPerPage}-${currentIndex}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-3"
            >
              {visibleTestimonials.map(
                ({ id, name, role, initials, quote }) => (
                  <div
                    key={id}
                    className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs"
                  >
                    <div>
                      <Quote className="mb-4 h-6 w-6 text-primary/40" />
                      <p className="text-sm leading-relaxed text-foreground">
                        "{quote}"
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {name}
                        </div>
                        <Badge variant="outline" className="mt-0.5 text-[10px]">
                          {role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={`page-${idx + 1}`}
              type="button"
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
