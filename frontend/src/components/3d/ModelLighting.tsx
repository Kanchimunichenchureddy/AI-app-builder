import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun } from 'lucide-react';

interface ModelLightingProps {
  intensity: number;
  color: string;
  position: [number, number, number];
  onIntensityChange: (intensity: number) => void;
  onColorChange: (color: string) => void;
  onPositionChange: (position: [number, number, number]) => void;
}

export function ModelLighting({
  intensity,
  color,
  position,
  onIntensityChange,
  onColorChange,
  onPositionChange
}: ModelLightingProps) {
  const updatePosition = (axis: number, value: number) => {
    const newPosition = [...position] as [number, number, number];
    newPosition[axis] = value;
    onPositionChange(newPosition);
  };

  const presetLightColors = [
    '#ffffff', '#fff4e6', '#e6f3ff', '#ffe6e6',
    '#e6ffe6', '#f3e6ff', '#ffffe6', '#e6ffff'
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Directional Light
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Light Intensity */}
          <div className="space-y-2">
            <Label className="text-xs">Intensity</Label>
            <div className="flex gap-2 items-center">
              <Slider
                value={[intensity]}
                onValueChange={([value]) => onIntensityChange(value)}
                min={0}
                max={3}
                step={0.1}
                className="flex-1"
              />
              <Input
                type="number"
                value={intensity.toFixed(1)}
                onChange={(e) => onIntensityChange(parseFloat(e.target.value) || 0)}
                className="w-16 h-8 text-xs"
                step={0.1}
                min={0}
                max={3}
              />
            </div>
          </div>

          {/* Light Color */}
          <div className="space-y-3">
            <Label className="text-xs">Light Color</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-12 h-8 rounded border border-input cursor-pointer"
              />
              <div className="text-xs text-muted-foreground font-mono">
                {color.toUpperCase()}
              </div>
            </div>
            
            {/* Light Color Presets */}
            <div className="grid grid-cols-4 gap-1">
              {presetLightColors.map((lightColor) => (
                <button
                  key={lightColor}
                  onClick={() => onColorChange(lightColor)}
                  className="w-8 h-8 rounded border border-input hover:scale-110 transition-transform"
                  style={{ backgroundColor: lightColor }}
                  title={lightColor}
                />
              ))}
            </div>
          </div>

          {/* Light Position */}
          <div className="space-y-4">
            <Label className="text-xs">Light Position</Label>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={axis} className="space-y-2">
                <Label className="text-xs">{axis} Position</Label>
                <div className="flex gap-2 items-center">
                  <Slider
                    value={[position[index]]}
                    onValueChange={([value]) => updatePosition(index, value)}
                    min={-20}
                    max={20}
                    step={0.5}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={position[index].toFixed(1)}
                    onChange={(e) => updatePosition(index, parseFloat(e.target.value) || 0)}
                    className="w-16 h-8 text-xs"
                    step={0.5}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Light Direction Info */}
          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
            <p className="font-medium mb-1">Tips:</p>
            <ul className="space-y-1">
              <li>• Higher Y values create top-down lighting</li>
              <li>• Adjust X and Z for side lighting effects</li>
              <li>• Higher intensity for brighter scenes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}