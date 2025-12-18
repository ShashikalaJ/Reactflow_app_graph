import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, useSelectedNode } from '@/store/useAppStore';
import { NodeInspector } from '@/components/inspector/NodeInspector';
import type { ServiceNodeData } from '@/api/mockData';
import type { Node } from '@xyflow/react';

export function RightPanel() {
  const { selectedNodeId, isMobilePanelOpen, setMobilePanelOpen, setSelectedNodeId } = useAppStore();
  const selectedNode = useSelectedNode();

  // Only show when a node is selected
  if (!selectedNode || !selectedNodeId) {
    return null;
  }

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <span className="font-medium text-sm">Node Inspector</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setSelectedNodeId(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <NodeInspector node={selectedNode as Node<ServiceNodeData>} />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop panel */}
      <aside className="hidden lg:block w-72 border-l border-border bg-panel animate-fade-in">
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
            {content}
          </aside>
        </>
      )}
    </>
  );
}
