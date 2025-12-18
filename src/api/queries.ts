import { useQuery } from '@tanstack/react-query';
import { mockApps, getGraphForApp, type App, type ServiceNode } from './mockData';
import type { Edge } from '@xyflow/react';

// Simulated network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API: GET /apps
export const fetchApps = async (): Promise<App[]> => {
  await delay(300);
  return mockApps;
};

// Mock API: GET /apps/:appId/graph
export const fetchGraph = async (
  appId: string
): Promise<{ nodes: ServiceNode[]; edges: Edge[] }> => {
  await delay(400);
  return getGraphForApp(appId);
};

// TanStack Query hooks
export const useApps = () => {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGraph = (appId: string | null) => {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId!),
    enabled: !!appId,
    staleTime: 2 * 60 * 1000,
  });
};
