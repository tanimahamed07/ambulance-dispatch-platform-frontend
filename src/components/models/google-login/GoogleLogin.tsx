"use client";

import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

interface GoogleLoginComponentProps {
  onSuccess?: () => void;
}

// Google SVG Logo
const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z"
      fill="#4285F4"
    />
    <path
      d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
      fill="#34A853"
    />
    <path
      d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
      fill="#EA4335"
    />
  </svg>
);

export default function GoogleLoginComponent({
  onSuccess,
}: GoogleLoginComponentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { mutate: googleLogin, isPending } = useGoogleOAuth();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // Exchange authorization code for ID token
        const tokenResponse = await fetch(
          "https://oauth2.googleapis.com/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              code: codeResponse.code,
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
              redirect_uri: window.location.origin,
              grant_type: "authorization_code",
            }),
          },
        );

        const tokens = await tokenResponse.json();
        const idToken = tokens.id_token;

        if (!idToken) {
          toast.add({
            title: "Google Login Failed",
            description: "No credential received. Please try again",
            type: "error",
          });
          return;
        }

        googleLogin(
          { idToken },
          {
            onSuccess: () => {
              toast.add({
                title: "Login Successful",
                description: "Welcome! You've been signed in with Google",
                type: "success",
              });

              if (onSuccess) {
                onSuccess();
              } else {
                router.push(callbackUrl);
              }
            },
            onError: (err: any) => {
              toast.add({
                title: "Google Login Failed",
                description:
                  err?.message || "Something went wrong. Please try again",
                type: "error",
              });
            },
          },
        );
      } catch (error) {
        toast.add({
          title: "Google Login Failed",
          description: "Failed to connect with Google. Please try again",
          type: "error",
        });
      }
    },
    onError: () => {
      toast.add({
        title: "Google Login Failed",
        description: "Failed to connect with Google. Please try again",
        type: "error",
      });
    },
    flow: "auth-code",
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={isPending}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? (
        <>
          <Spinner className="h-[18px] w-[18px]" />
          <span>Connecting with Google...</span>
        </>
      ) : (
        <>
          <GoogleIcon />
          <span>Google-এ বাংলায় লগিন করুন</span>
        </>
      )}
    </button>
  );
}
