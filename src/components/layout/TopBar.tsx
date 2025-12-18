import { ChevronDown, MoreHorizontal, Share2, Sun, Moon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/store/useAppStore';
import { useApps } from '@/api/queries';

export function TopBar() {
  const { selectedAppId, setSelectedAppId } = useAppStore();
  const { data: apps } = useApps();
  
  const selectedApp = apps?.find((app) => app.id === selectedAppId);

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-muted to-accent rounded flex items-center justify-center">
          <span className="text-foreground font-bold text-sm">/</span>
        </div>
        
        {/* App Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-3 h-9">
              {selectedApp && (
                <span 
                  className="w-5 h-5 rounded flex items-center justify-center text-xs"
                  style={{ backgroundColor: selectedApp.color }}
                >
                  {selectedApp.icon}
                </span>
              )}
              <span className="font-medium">
                {selectedApp?.name || 'Select App'}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {apps?.map((app) => (
              <DropdownMenuItem
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className="gap-2"
              >
                <span 
                  className="w-5 h-5 rounded flex items-center justify-center text-xs"
                  style={{ backgroundColor: app.color }}
                >
                  {app.icon}
                </span>
                {app.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Moon className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Sun className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
