import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Settings, Cpu, Database as DbIcon, HardDrive, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import type { ServiceNodeData } from '@/api/mockData';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const ServiceNode = memo(({ data, id, selected }: NodeProps) => {
  const { updateNodeData } = useAppStore();
  
  const nodeData = data as ServiceNodeData;
  
  const statusConfig = {
    healthy: { 
      color: 'bg-success/20 text-success border-success/30',
      icon: CheckCircle,
      label: 'Success'
    },
    degraded: { 
      color: 'bg-warning/20 text-warning border-warning/30',
      icon: AlertTriangle,
      label: 'Degraded'
    },
    down: { 
      color: 'bg-destructive/20 text-destructive border-destructive/30',
      icon: AlertTriangle,
      label: 'Error'
    },
  };

  const status = statusConfig[nodeData.status];
  const StatusIcon = status.icon;

  const typeIcons: Record<string, string> = {
    database: '🐘',
    cache: '🔴',
    service: '⚙️',
  };

  const handleSliderChange = (value: number[]) => {
    updateNodeData(id, { resourceValue: value[0] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    updateNodeData(id, { resourceValue: value });
  };

  return (
    <div 
      className={cn(
        "bg-card rounded-lg border border-border shadow-lg min-w-[280px] transition-all",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-primary !w-3 !h-3 !border-2 !border-background" 
      />
      
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xl">{typeIcons[nodeData.type]}</span>
          <span className="font-semibold">{nodeData.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
            {nodeData.price}
          </Badge>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Metrics */}
      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{nodeData.cpu}</span>
          <span>{nodeData.memory}</span>
          <span>{nodeData.disk}</span>
          <span>{nodeData.region}</span>
        </div>
        
        {/* Mini Tabs */}
        <Tabs defaultValue="cpu" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-8">
            <TabsTrigger value="cpu" className="text-xs gap-1 px-2">
              <Cpu className="w-3 h-3" />
              CPU
            </TabsTrigger>
            <TabsTrigger value="memory" className="text-xs gap-1 px-2">
              <DbIcon className="w-3 h-3" />
              Memory
            </TabsTrigger>
            <TabsTrigger value="disk" className="text-xs gap-1 px-2">
              <HardDrive className="w-3 h-3" />
              Disk
            </TabsTrigger>
            <TabsTrigger value="region" className="text-xs gap-1 px-2">
              <Globe className="w-3 h-3" />
              Region
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Slider + Input */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Slider
              value={[nodeData.resourceValue]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="w-full"
            />
            <div 
              className="absolute inset-0 h-2 rounded-full pointer-events-none"
              style={{
                background: `linear-gradient(to right, hsl(142, 71%, 45%) 0%, hsl(38, 92%, 50%) ${nodeData.resourceValue}%, transparent ${nodeData.resourceValue}%)`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
          <Input
            type="number"
            value={nodeData.resourceValue.toFixed(2)}
            onChange={handleInputChange}
            className="w-16 h-8 text-xs bg-muted border-0 text-center"
          />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <Badge 
            variant="outline" 
            className={cn('text-xs gap-1', status.color)}
          >
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </Badge>
          <span className="text-lg font-bold text-warning">aws</span>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-primary !w-3 !h-3 !border-2 !border-background" 
      />
    </div>
  );
});

ServiceNode.displayName = 'ServiceNode';

export default ServiceNode;
