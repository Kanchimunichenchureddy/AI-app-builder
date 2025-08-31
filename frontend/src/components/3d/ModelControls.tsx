import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface ModelControlsProps {
  onReset: () => void;
}

export function ModelControls({ onReset }: ModelControlsProps) {
  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">3D Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button variant="outline" size="sm" disabled>
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <Move className="h-3 w-3" />
            <span>Left click + drag to rotate</span>
          </div>
          <div className="flex items-center gap-2">
            <ZoomIn className="h-3 w-3" />
            <span>Scroll to zoom in/out</span>
          </div>
          <div className="flex items-center gap-2">
            <ZoomOut className="h-3 w-3" />
            <span>Right click + drag to pan</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}