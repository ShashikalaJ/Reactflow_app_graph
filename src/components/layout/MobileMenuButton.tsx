import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

export function MobileMenuButton() {
  const { setMobilePanelOpen } = useAppStore();

  return (
    <Button
      variant="outline"
      size="icon"
      className="lg:hidden fixed bottom-4 right-4 z-30 h-12 w-12 rounded-full shadow-lg"
      onClick={() => setMobilePanelOpen(true)}
    >
      <Menu className="w-5 h-5" />
    </Button>
  );
}
