import { create } from 'zustand';
import type { Node, Edge } from '@xyflow/react';
import type { ServiceNodeData } from '@/api/mockData';

interface AppState {
  // Selection state
  selectedAppId: string | null;
  selectedNodeId: string | null;
  
  // UI state
  isMobilePanelOpen: boolean;
  activeInspectorTab: string;
  
  // Graph state (managed alongside ReactFlow)
  nodes: Node<ServiceNodeData>[];
  edges: Edge[];
  
  // Actions
  setSelectedAppId: (appId: string | null) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: string) => void;
  setNodes: (nodes: Node<ServiceNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (nodeId: string, data: Partial<ServiceNodeData>) => void;
  deleteNode: (nodeId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  nodes: [],
  edges: [],
  
  // Actions
  setSelectedAppId: (appId) => set({ selectedAppId: appId, selectedNodeId: null }),
  
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  
  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),
  
  updateNodeData: (nodeId, data) => {
    const nodes = get().nodes.map((node) =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, ...data } }
        : node
    );
    set({ nodes });
  },
  
  deleteNode: (nodeId) => {
    const nodes = get().nodes.filter((node) => node.id !== nodeId);
    const edges = get().edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    set({ 
      nodes, 
      edges,
      selectedNodeId: get().selectedNodeId === nodeId ? null : get().selectedNodeId 
    });
  },
}));

// Selectors
export const useSelectedNode = () => {
  const { nodes, selectedNodeId } = useAppStore();
  return nodes.find((node) => node.id === selectedNodeId) ?? null;
};
