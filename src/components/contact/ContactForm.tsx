// components/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const SUBJECTS = [
  { value: "general", label: "General inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "driver_support", label: "Driver support" },
  { value: "report_issue", label: "Report an issue" },
] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  subject: z.enum(
    ["general", "partnership", "driver_support", "report_issue"],
    {
      errorMap: () => ({ message: "Please choose a subject" }),
    },
  ),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

const SUPPORT_EMAIL = "support@rescue.app";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
    },
  });

  const subject = watch("subject");

  function onSubmit(values: ContactValues) {
    const subjectLabel =
      SUBJECTS.find((s) => s.value === values.subject)?.label ??
      "General inquiry";

    const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      `[${subjectLabel}] from${values.name}`,
    )}&body=${encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)}`;

    window.location.href = mailtoUrl;
    setSent(true);
  }

  function handleReset() {
    reset();
    setSent(false);
  }

  if (sent) {
    return (
      <Card className="border-border bg-card text-card-foreground shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Opening your email client...
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              If it didn't open automatically, you can email us directly at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-destructive underline hover:opacity-90"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="mt-2 gap-2"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card text-card-foreground shadow-sm">
      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your name"
                className="bg-background"
              />
              {errors.name && (
                <p className="text-xs font-medium text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="bg-background"
              />
              {errors.email && (
                <p className="text-xs font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <Label
              htmlFor="subject"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Subject
            </Label>
            <Select
              value={subject}
              onValueChange={(v) =>
                setValue("subject", v as ContactValues["subject"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger id="subject" className="bg-background">
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-xs font-medium text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <Label
              htmlFor="message"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Message
            </Label>
            <Textarea
              id="message"
              {...register("message")}
              rows={5}
              placeholder="How can we help?"
              className="resize-none bg-background"
            />
            {errors.message && (
              <p className="text-xs font-medium text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gap-2 sm:w-auto"
          >
            <Send className="h-4 w-4" />
            Send message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
