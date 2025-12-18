import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  type Connection,
  type NodeTypes,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ServiceNode from './ServiceNode';
import { useAppStore } from '@/store/useAppStore';
import { useGraph } from '@/api/queries';
import { Loader2 } from 'lucide-react';

const nodeTypes: NodeTypes = {
  serviceNode: ServiceNode,
};

export function FlowCanvas() {
  const { selectedAppId, setSelectedNodeId, setNodes: setStoreNodes, setEdges: setStoreEdges, deleteNode } = useAppStore();
  const { data: graphData, isLoading, error } = useGraph(selectedAppId);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Load graph data when fetched
  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes);
      setEdges(graphData.edges);
      setStoreNodes(graphData.nodes);
      setStoreEdges(graphData.edges);
    }
  }, [graphData, setStoreNodes, setStoreEdges]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  // Handle keyboard delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && 
          document.activeElement?.tagName !== 'INPUT' && 
          document.activeElement?.tagName !== 'TEXTAREA') {
        const currentSelectedNodeId = useAppStore.getState().selectedNodeId;
        if (currentSelectedNodeId) {
          deleteNode(currentSelectedNodeId);
          setNodes((nds) => nds.filter((n) => n.id !== currentSelectedNodeId));
          setEdges((eds) => eds.filter((edge) => edge.source !== currentSelectedNodeId && edge.target !== currentSelectedNodeId));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteNode]);

  if (!selectedAppId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-canvas-bg">
        <p className="text-muted-foreground">Select an app to view its graph</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-canvas-bg">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-canvas-bg">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load graph</p>
          <p className="text-sm text-muted-foreground">Please try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{
          style: { stroke: 'hsl(220, 13%, 30%)', strokeWidth: 2 },
          animated: true,
        }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="hsl(220, 13%, 18%)"
        />
        <Controls className="!bg-card !border-border" />
        <MiniMap 
          className="!bg-card !border-border"
          nodeColor="hsl(220, 13%, 30%)"
          maskColor="hsl(220, 13%, 10%, 0.8)"
        />
      </ReactFlow>
    </div>
  );
}
