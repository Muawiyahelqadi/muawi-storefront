import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function EmptyState() {
  return (
    <Card className="p-12">
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <Calendar className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-semibold">No Appointments Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      </div>
    </Card>
  );
}
