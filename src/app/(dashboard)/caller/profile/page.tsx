import ProfileCard from "@/components/profile/ProfileCard";

export default function CallerProfilePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information
        </p>
      </div>

      <ProfileCard />
    </div>
  );
}
