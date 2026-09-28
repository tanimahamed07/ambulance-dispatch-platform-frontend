import {
  Ambulance,
  CircleAlert,
  Navigation,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STATS = [
  { label: "Active Trips", value: "12", icon: Navigation },
  { label: "Fleet Available", value: "38 / 52", icon: Ambulance },
  { label: "Drivers on Duty", value: "41", icon: Users },
  { label: "Pending Alerts", value: "3", icon: CircleAlert },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back — here is what's happening across your fleet right now.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <stat.icon className="size-4 text-muted-foreground" />
                {stat.label}
              </CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Placeholder — wire up real data here.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}