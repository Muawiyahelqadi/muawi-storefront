import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Loader2 className="w-14 h-14 text-blue-600/50 animate-spin" />
    </div>
  );
}
