import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import type { ModelData } from '@/pages/ModelEditor';

interface ModelMaterialsProps {
  modelData: ModelData;
  onUpdate: (data: ModelData) => void;
}

export function ModelMaterials({ modelData, onUpdate }: ModelMaterialsProps) {
  const updateColor = (color: string) => {
    onUpdate({ ...modelData, color });
  };

  const updateRoughness = (roughness: number) => {
    onUpdate({ ...modelData, roughness });
  };

  const updateMetalness = (metalness: number) => {
    onUpdate({ ...modelData, metalness });
  };

  const updateEmissive = (emissive: string) => {
    onUpdate({ ...modelData, emissive });
  };

  const presetColors = [
    '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ffa500',
    '#800080', '#ffc0cb', '#a52a2a', '#808080'
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Material Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Base Color */}
          <div className="space-y-3">
            <Label className="text-xs">Base Color</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={modelData.color}
                onChange={(e) => updateColor(e.target.value)}
                className="w-12 h-8 rounded border border-input cursor-pointer"
              />
              <div className="text-xs text-muted-foreground font-mono">
                {modelData.color.toUpperCase()}
              </div>
            </div>
            
            {/* Color Presets */}
            <div className="grid grid-cols-6 gap-1">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateColor(color)}
                  className="w-8 h-8 rounded border border-input hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Roughness */}
          <div className="space-y-2">
            <Label className="text-xs">Roughness</Label>
            <div className="flex gap-2 items-center">
              <Slider
                value={[modelData.roughness]}
                onValueChange={([value]) => updateRoughness(value)}
                min={0}
                max={1}
                step={0.01}
                className="flex-1"
              />
              <div className="w-12 text-xs text-muted-foreground text-right">
                {modelData.roughness.toFixed(2)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              0 = Mirror-like, 1 = Completely rough
            </p>
          </div>

          {/* Metalness */}
          <div className="space-y-2">
            <Label className="text-xs">Metalness</Label>
            <div className="flex gap-2 items-center">
              <Slider
                value={[modelData.metalness]}
                onValueChange={([value]) => updateMetalness(value)}
                min={0}
                max={1}
                step={0.01}
                className="flex-1"
              />
              <div className="w-12 text-xs text-muted-foreground text-right">
                {modelData.metalness.toFixed(2)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              0 = Non-metal, 1 = Pure metal
            </p>
          </div>

          {/* Emissive */}
          <div className="space-y-3">
            <Label className="text-xs">Emissive Color</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={modelData.emissive}
                onChange={(e) => updateEmissive(e.target.value)}
                className="w-12 h-8 rounded border border-input cursor-pointer"
              />
              <div className="text-xs text-muted-foreground font-mono">
                {modelData.emissive.toUpperCase()}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Color that glows in the dark
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}