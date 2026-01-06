"use client";

import React, { useState } from "react";
import { Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { isRtlDirection } from "@/src/i18n/utilities";

export interface MenuItem {
  /** Display label for the menu item */
  title: string;
  /** Navigation href/path */
  url?: string;
}

export interface MobileMenuProps {
  /** Array of navigation menu items */
  menuItems: MenuItem[];
  /** Custom navigation handler - receives the clicked menu item */
  onNavigate?: (e: React.MouseEvent<any>, item: MenuItem) => void;
  /** Additional CSS classes for the trigger button */
  triggerClassName?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  menuItems = [],
  onNavigate,
  triggerClassName = "",
}) => {
  const isRtl = isRtlDirection() as boolean;
  const [open, setOpen] = useState<boolean>(false);

  const handleNavigation = (e: React.MouseEvent<any>, item: MenuItem): void => {
    setOpen(false);

    onNavigate?.(e, item);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`lg:hidden text-slate-800/50${triggerClassName}`}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side={isRtl ? "right" : "left"}
        className="w-[300px] sm:w-[350px] bg-white border-slate-800 p-0"
      >
        {/* Navigation Links */}
        <nav className="flex flex-col py-10">
          {menuItems.map((item, index) => {
            return (
              <button
                key={`${item.title}-${index}`}
                onClick={(e) => handleNavigation(e, item)}
                className="group flex items-center justify-between px-6 py-4 text-gray-500 hover:text-white hover:bg-slate-800/30 transition-all duration-200"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: open ? "slideIn 0.3s ease-out forwards" : "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-medium text-base">{item.title}</span>
                </div>
                {isRtl ? (
                  <ChevronLeft className="h-5 w-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                )}
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
