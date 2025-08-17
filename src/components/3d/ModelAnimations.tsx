import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCw, ArrowUpDown, Mouse } from 'lucide-react';

interface ModelAnimationsProps {
  animations: {
    rotate: boolean;
    bounce: boolean;
    hover: boolean;
    speed: number;
  };
  onUpdate: (animations: ModelAnimationsProps['animations']) => void;
  enableAnimations: boolean;
}

export function ModelAnimations({ animations, onUpdate, enableAnimations }: ModelAnimationsProps) {
  const updateAnimation = (key: keyof typeof animations, value: boolean | number) => {
    onUpdate({ ...animations, [key]: value });
  };

  if (!enableAnimations) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground">
            <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Animations are disabled</p>
            <p className="text-xs mt-1">Enable animations in the accessibility toggle</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Play className="h-4 w-4" />
            Animations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Animation Speed */}
          <div className="space-y-2">
            <Label className="text-xs">Animation Speed</Label>
            <div className="flex gap-2 items-center">
              <Slider
                value={[animations.speed]}
                onValueChange={([value]) => updateAnimation('speed', value)}
                min={0.1}
                max={3}
                step={0.1}
                className="flex-1"
              />
              <div className="w-12 text-xs text-muted-foreground text-right">
                {animations.speed.toFixed(1)}x
              </div>
            </div>
          </div>

          {/* Rotation Animation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCw className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-xs">Continuous Rotation</Label>
                <p className="text-xs text-muted-foreground">Rotate around Y-axis</p>
              </div>
            </div>
            <Switch
              checked={animations.rotate}
              onCheckedChange={(checked) => updateAnimation('rotate', checked)}
            />
          </div>

          {/* Bounce Animation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-xs">Bounce Effect</Label>
                <p className="text-xs text-muted-foreground">Vertical bouncing motion</p>
              </div>
            </div>
            <Switch
              checked={animations.bounce}
              onCheckedChange={(checked) => updateAnimation('bounce', checked)}
            />
          </div>

          {/* Hover Animation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mouse className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label className="text-xs">Floating Effect</Label>
                <p className="text-xs text-muted-foreground">Gentle floating motion</p>
              </div>
            </div>
            <Switch
              checked={animations.hover}
              onCheckedChange={(checked) => updateAnimation('hover', checked)}
            />
          </div>

          {/* Animation Preview */}
          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
            <p className="font-medium mb-1">Active Animations:</p>
            {!animations.rotate && !animations.bounce && !animations.hover ? (
              <p>No animations active</p>
            ) : (
              <ul className="space-y-1">
                {animations.rotate && <li>• Continuous rotation</li>}
                {animations.bounce && <li>• Bouncing motion</li>}
                {animations.hover && <li>• Floating effect</li>}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}