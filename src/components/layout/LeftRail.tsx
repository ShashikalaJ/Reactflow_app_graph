import { Github, Key, Layers, Leaf, Box, LayoutGrid, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { icon: Github, label: 'GitHub', color: 'text-foreground' },
  { icon: Key, label: 'Authentication', color: 'text-primary' },
  { icon: Layers, label: 'Layers', color: 'text-destructive' },
  { icon: Leaf, label: 'Environment', color: 'text-primary' },
  { icon: Box, label: 'Services', color: 'text-muted-foreground' },
  { icon: LayoutGrid, label: 'Dashboard', color: 'text-warning' },
  { icon: Network, label: 'Network', color: 'text-primary' },
];

export function LeftRail() {
  return (
    <aside className="w-14 border-r border-border bg-background flex flex-col items-center py-4 gap-2">
      {navItems.map((item, index) => (
        <Tooltip key={index} delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 ${item.color} hover:bg-accent`}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </aside>
  );
}
