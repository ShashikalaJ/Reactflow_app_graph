import { Search, Plus, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/store/useAppStore';
import { useApps } from '@/api/queries';
import { cn } from '@/lib/utils';

interface AppListPanelProps {
  onClose: () => void;
}

export function AppListPanel({ onClose }: AppListPanelProps) {
  const { selectedAppId, setSelectedAppId } = useAppStore();
  const { data: apps, isLoading, error } = useApps();

  const handleAppSelect = (appId: string) => {
    setSelectedAppId(appId);
    onClose();
  };

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Application</h2>
        
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-9 bg-muted border-0"
            />
          </div>
          <Button size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {isLoading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
            Failed to load apps. Please try again.
          </div>
        )}
        
        {apps && (
          <ScrollArea className="h-[240px]">
            <div className="space-y-1">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppSelect(app.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-left",
                    selectedAppId === app.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <span 
                    className="w-7 h-7 rounded flex items-center justify-center text-sm"
                    style={{ backgroundColor: app.color }}
                  >
                    {app.icon}
                  </span>
                  <span className="flex-1 font-medium text-sm">{app.name}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
