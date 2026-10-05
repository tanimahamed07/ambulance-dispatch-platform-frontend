"use client";

import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

interface GoogleLoginComponentProps {
  onSuccess?: () => void;
}

export default function GoogleLoginComponent({
  onSuccess,
}: GoogleLoginComponentProps) {
  const router = useRouter();
  const { mutate: googleLogin, isPending } = useGoogleOAuth();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

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
            router.push("/");
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
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google Login Failed",
      description: "Failed to connect with Google. Please try again",
      type: "error",
    });
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="100%"
        logo_alignment="left"
      />
    </div>
  );
}
