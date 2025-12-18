import { Search, Plus, ChevronRight, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore, useSelectedNode } from '@/store/useAppStore';
import { useApps } from '@/api/queries';
import { NodeInspector } from '@/components/inspector/NodeInspector';
import { cn } from '@/lib/utils';
import type { ServiceNodeData } from '@/api/mockData';
import type { Node } from '@xyflow/react';

export function RightPanel() {
  const { selectedAppId, setSelectedAppId, selectedNodeId, isMobilePanelOpen, setMobilePanelOpen } = useAppStore();
  const { data: apps, isLoading, error } = useApps();
  const selectedNode = useSelectedNode();

  const content = (
    <div className="flex flex-col h-full">
      {/* App List Section */}
      <div className="p-4 border-b border-border">
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
          <ScrollArea className="h-[200px]">
            <div className="space-y-1">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
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
      
      {/* Node Inspector Section */}
      {selectedNode && selectedNodeId && (
        <div className="flex-1 overflow-hidden">
          <NodeInspector node={selectedNode as Node<ServiceNodeData>} />
        </div>
      )}
      
      {!selectedNode && selectedAppId && (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground text-sm text-center">
            Select a node on the canvas to view its details
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop panel */}
      <aside className="hidden lg:block w-80 border-l border-border bg-panel">
        {content}
      </aside>
      
      {/* Mobile drawer */}
      {isMobilePanelOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setMobilePanelOpen(false)}
          />
          <aside className="lg:hidden fixed right-0 top-0 h-full w-80 bg-panel border-l border-border z-50 animate-slide-in-right">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setMobilePanelOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            {content}
          </aside>
        </>
      )}
    </>
  );
}
