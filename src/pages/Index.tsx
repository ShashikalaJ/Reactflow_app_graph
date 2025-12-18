import { useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from '@/components/layout/TopBar';
import { LeftRail } from '@/components/layout/LeftRail';
import { RightPanel } from '@/components/layout/RightPanel';
import { FlowCanvas } from '@/components/canvas/FlowCanvas';
import { MobileMenuButton } from '@/components/layout/MobileMenuButton';
import { useAppStore } from '@/store/useAppStore';
import { useApps } from '@/api/queries';

const Index = () => {
  const { selectedAppId, setSelectedAppId, selectedNodeId } = useAppStore();
  const { data: apps } = useApps();

  // Auto-select first app on load
  useEffect(() => {
    if (apps && apps.length > 0 && !selectedAppId) {
      setSelectedAppId(apps[0].id);
    }
  }, [apps, selectedAppId, setSelectedAppId]);

  return (
    <ReactFlowProvider>
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 flex overflow-hidden">
          <LeftRail />
          <main className="flex-1 flex overflow-hidden">
            <FlowCanvas />
          </main>
          <RightPanel />
        </div>
        {selectedNodeId && <MobileMenuButton />}
      </div>
    </ReactFlowProvider>
  );
};

export default Index;
