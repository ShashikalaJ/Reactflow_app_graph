import type { Node, Edge } from '@xyflow/react';

export interface App {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  type: 'database' | 'cache' | 'service';
  status: 'healthy' | 'degraded' | 'down';
  price: string;
  cpu: number;
  memory: string;
  disk: string;
  region: number;
  resourceValue: number;
  description: string;
  provider: 'aws' | 'gcp' | 'azure';
}

export type ServiceNode = Node<ServiceNodeData>;

export const mockApps: App[] = [
  { id: 'supertokens-golang', name: 'supertokens-golang', icon: '🔑', color: '#22c55e' },
  { id: 'supertokens-java', name: 'supertokens-java', icon: '⚙️', color: '#64748b' },
  { id: 'supertokens-python', name: 'supertokens-python', icon: '🐍', color: '#ef4444' },
  { id: 'supertokens-ruby', name: 'supertokens-ruby', icon: '💎', color: '#f97316' },
  { id: 'supertokens-go', name: 'supertokens-go', icon: '🌿', color: '#22c55e' },
];

export const mockGraphs: Record<string, { nodes: ServiceNode[]; edges: Edge[] }> = {
  'supertokens-golang': {
    nodes: [
      {
        id: 'postgres-1',
        type: 'serviceNode',
        position: { x: 550, y: 100 },
        data: {
          label: 'Postgres',
          type: 'database',
          status: 'healthy',
          price: '$0.03/HR',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          resourceValue: 75,
          description: 'Primary PostgreSQL database',
          provider: 'aws',
        },
      },
      {
        id: 'redis-1',
        type: 'serviceNode',
        position: { x: 100, y: 350 },
        data: {
          label: 'Redis',
          type: 'cache',
          status: 'down',
          price: '$0.03/HR',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          resourceValue: 45,
          description: 'Session cache layer',
          provider: 'aws',
        },
      },
      {
        id: 'mongodb-1',
        type: 'serviceNode',
        position: { x: 600, y: 420 },
        data: {
          label: 'Mongodb',
          type: 'database',
          status: 'down',
          price: '$0.03/HR',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          resourceValue: 85,
          description: 'Document store for user data',
          provider: 'aws',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'postgres-1', target: 'redis-1', animated: true },
      { id: 'e1-3', source: 'postgres-1', target: 'mongodb-1', animated: true },
    ],
  },
  'supertokens-java': {
    nodes: [
      {
        id: 'mysql-1',
        type: 'serviceNode',
        position: { x: 250, y: 150 },
        data: {
          label: 'MySQL',
          type: 'database',
          status: 'healthy',
          price: '$0.05/HR',
          cpu: 0.04,
          memory: '0.1 GB',
          disk: '20.00 GB',
          region: 2,
          resourceValue: 60,
          description: 'Main database',
          provider: 'aws',
        },
      },
      {
        id: 'memcached-1',
        type: 'serviceNode',
        position: { x: 550, y: 300 },
        data: {
          label: 'Memcached',
          type: 'cache',
          status: 'degraded',
          price: '$0.02/HR',
          cpu: 0.01,
          memory: '0.02 GB',
          disk: '5.00 GB',
          region: 2,
          resourceValue: 30,
          description: 'Memory cache',
          provider: 'gcp',
        },
      },
    ],
    edges: [
      { id: 'e-java-1', source: 'mysql-1', target: 'memcached-1', animated: true },
    ],
  },
};

// Generate default graph for apps without specific data
const generateDefaultGraph = (appId: string): { nodes: ServiceNode[]; edges: Edge[] } => ({
  nodes: [
    {
      id: `${appId}-db`,
      type: 'serviceNode',
      position: { x: 300, y: 200 },
      data: {
        label: 'Database',
        type: 'database',
        status: 'healthy',
        price: '$0.03/HR',
        cpu: 0.02,
        memory: '0.05 GB',
        disk: '10.00 GB',
        region: 1,
        resourceValue: 50,
        description: 'Default database',
        provider: 'aws',
      },
    },
  ],
  edges: [],
});

export const getGraphForApp = (appId: string) => {
  return mockGraphs[appId] || generateDefaultGraph(appId);
};
