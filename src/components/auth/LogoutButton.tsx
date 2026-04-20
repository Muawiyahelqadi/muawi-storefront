"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTranslate from "@/src/i18n/useTranslate";

export function LogoutButton() {
  const translate = useTranslate();
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/signIn" })}
    >
      <LogOut className="size-4" />
      <span>{translate("logout")}</span>
    </Button>
  );
}
