"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeSwitcher = ({ inverted = false }: { inverted?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "rounded-full w-9 px-0 outline-none",
            inverted
              ? "bg-transparent! text-background! hover:bg-background/10! data-[state=open]:bg-background/10! data-[state=open]:text-background!" 
              : "text-muted-foreground"
          )}
        >
          {theme === "light" ? (
            <Sun size={ICON_SIZE} />
          ) : theme === "dark" ? (
            <Moon size={ICON_SIZE} />
          ) : (
            <Laptop size={ICON_SIZE} />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className={cn(
          "w-content", 
          inverted && "bg-foreground text-background border-background/20"
        )} 
        align="end"
      >
        <DropdownMenuRadioGroup value={theme} onValueChange={(e) => setTheme(e)}>
          <DropdownMenuRadioItem 
            className={cn("flex gap-2 cursor-pointer", inverted && "focus:bg-background/10! focus:text-background!")} 
            value="light"
          >
            <Sun size={ICON_SIZE} className={inverted ? "" : "text-muted-foreground"} /> <span>Light</span>
          </DropdownMenuRadioItem>
          
          <DropdownMenuRadioItem 
            className={cn("flex gap-2 cursor-pointer", inverted && "focus:bg-background/10! focus:text-background!")} 
            value="dark"
          >
            <Moon size={ICON_SIZE} className={inverted ? "" : "text-muted-foreground"} /> <span>Dark</span>
          </DropdownMenuRadioItem>
          
          <DropdownMenuRadioItem 
            className={cn("flex gap-2 cursor-pointer", inverted && "focus:bg-background/10! focus:text-background!")} 
            value="system"
          >
            <Laptop size={ICON_SIZE} className={inverted ? "" : "text-muted-foreground"} /> <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};