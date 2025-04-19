'use client'
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Moon, Sun, Bell, Search } from 'lucide-react';
import { useTheme } from "next-themes"

export function Header() {
    const { theme, setTheme } = useTheme()
  return (
    <header className="h-16 px-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger variant="outline" size="sm" />
        <div className="relative w-96 max-w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 rounded-md border bg-background"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-nexus-100 flex items-center justify-center text-nexus-800 font-medium ml-2">
          
        </div>
      </div>
    </header>
  );
}
