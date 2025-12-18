import { Cpu, HardDrive, Database, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import type { Node } from '@xyflow/react';
import type { ServiceNodeData } from '@/api/mockData';
import { cn } from '@/lib/utils';

interface NodeInspectorProps {
  node: Node<ServiceNodeData>;
}

export function NodeInspector({ node }: NodeInspectorProps) {
  const { activeInspectorTab, setActiveInspectorTab, updateNodeData } = useAppStore();
  const data = node.data as ServiceNodeData;

  const statusColors = {
    healthy: 'bg-success/20 text-success border-success/30',
    degraded: 'bg-warning/20 text-warning border-warning/30',
    down: 'bg-destructive/20 text-destructive border-destructive/30',
  };

  const statusLabels = {
    healthy: 'Success',
    degraded: 'Degraded',
    down: 'Error',
  };

  const handleResourceChange = (value: number[]) => {
    updateNodeData(node.id, { resourceValue: value[0] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    updateNodeData(node.id, { resourceValue: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(node.id, { label: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(node.id, { description: e.target.value });
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{data.label}</h3>
        <Badge 
          variant="outline" 
          className={cn('text-xs', statusColors[data.status])}
        >
          {statusLabels[data.status]}
        </Badge>
      </div>

      <Tabs 
        value={activeInspectorTab} 
        onValueChange={setActiveInspectorTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="flex-1 space-y-4 mt-0">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.label}
              onChange={handleNameChange}
              className="bg-muted border-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={handleDescriptionChange}
              className="bg-muted border-0 resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Resource Allocation</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider
                  value={[data.resourceValue]}
                  onValueChange={handleResourceChange}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <Input
                type="number"
                value={data.resourceValue}
                onChange={handleInputChange}
                min={0}
                max={100}
                className="w-20 bg-muted border-0 text-center"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="flex-1 space-y-4 mt-0">
          <div className="grid grid-cols-2 gap-3">
            <MetricCard icon={Cpu} label="CPU" value={`${data.cpu}`} />
            <MetricCard icon={Database} label="Memory" value={data.memory} />
            <MetricCard icon={HardDrive} label="Disk" value={data.disk} />
            <MetricCard icon={Globe} label="Region" value={`${data.region}`} />
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <span className="font-semibold text-primary">{data.price}</span>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Provider</span>
              <span className="font-medium uppercase">{data.provider}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string;
}) {
  return (
    <div className="p-3 bg-muted rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
