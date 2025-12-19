import { ChevronDown, ChevronUp, MoreHorizontal, Share2, Sun, Moon, User } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppStore } from '@/store/useAppStore';
import { useApps } from '@/api/queries';
import { AppListPanel } from './AppListPanel';
import { useState } from 'react';

export function TopBar() {
  const { selectedAppId } = useAppStore();
  const { data: apps } = useApps();
  const [isOpen, setIsOpen] = useState(false);
  const { fitView } = useReactFlow();

  
  const selectedApp = apps?.find((app) => app.id === selectedAppId);

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-muted to-accent rounded flex items-center justify-center">
          <span className="text-foreground font-bold text-sm">/</span>
        </div>
        
        {/* App Selector with Panel */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="gap-2 px-3 h-9">
              {selectedApp && (
                <span 
                  className="text-sm font-semibold tracking-tight"
                  style={{ backgroundColor: selectedApp.color }}
                >
                  {selectedApp.icon}
                </span>
              )}
              <span className="font-medium">
                {selectedApp?.name || 'Choose Application'}
                </span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            align="start" 
            className="w-80 p-0 bg-panel border-border"
            sideOffset={8}
          >
            <AppListPanel onClose={() => setIsOpen(false)} />
          </PopoverContent>
        </Popover>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fitView()}
        >
        Fit View
        </Button>
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
