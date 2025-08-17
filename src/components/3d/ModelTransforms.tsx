import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Move3D, RotateCw, Scale } from 'lucide-react';
import type { ModelData } from '@/pages/ModelEditor';

interface ModelTransformsProps {
  modelData: ModelData;
  onUpdate: (data: ModelData) => void;
}

export function ModelTransforms({ modelData, onUpdate }: ModelTransformsProps) {
  const updatePosition = (axis: number, value: number) => {
    const newPosition = [...modelData.position] as [number, number, number];
    newPosition[axis] = value;
    onUpdate({ ...modelData, position: newPosition });
  };

  const updateRotation = (axis: number, value: number) => {
    const newRotation = [...modelData.rotation] as [number, number, number];
    newRotation[axis] = (value * Math.PI) / 180; // Convert to radians
    onUpdate({ ...modelData, rotation: newRotation });
  };

  const updateScale = (axis: number, value: number) => {
    const newScale = [...modelData.scale] as [number, number, number];
    newScale[axis] = value;
    onUpdate({ ...modelData, scale: newScale });
  };

  const updateUniformScale = (value: number) => {
    onUpdate({ 
      ...modelData, 
      scale: [value, value, value] 
    });
  };

  return (
    <div className="space-y-6">
      {/* Position */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Move3D className="h-4 w-4" />
            Position
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {['X', 'Y', 'Z'].map((axis, index) => (
            <div key={axis} className="space-y-2">
              <Label className="text-xs">{axis} Position</Label>
              <div className="flex gap-2 items-center">
                <Slider
                  value={[modelData.position[index]]}
                  onValueChange={([value]) => updatePosition(index, value)}
                  min={-10}
                  max={10}
                  step={0.1}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={modelData.position[index].toFixed(1)}
                  onChange={(e) => updatePosition(index, parseFloat(e.target.value) || 0)}
                  className="w-16 h-8 text-xs"
                  step={0.1}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rotation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <RotateCw className="h-4 w-4" />
            Rotation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {['X', 'Y', 'Z'].map((axis, index) => (
            <div key={axis} className="space-y-2">
              <Label className="text-xs">{axis} Rotation (°)</Label>
              <div className="flex gap-2 items-center">
                <Slider
                  value={[(modelData.rotation[index] * 180) / Math.PI]}
                  onValueChange={([value]) => updateRotation(index, value)}
                  min={-180}
                  max={180}
                  step={1}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={Math.round((modelData.rotation[index] * 180) / Math.PI)}
                  onChange={(e) => updateRotation(index, parseInt(e.target.value) || 0)}
                  className="w-16 h-8 text-xs"
                  step={1}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scale */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Scale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">Uniform Scale</Label>
            <div className="flex gap-2 items-center">
              <Slider
                value={[modelData.scale[0]]}
                onValueChange={([value]) => updateUniformScale(value)}
                min={0.1}
                max={5}
                step={0.1}
                className="flex-1"
              />
              <Input
                type="number"
                value={modelData.scale[0].toFixed(1)}
                onChange={(e) => updateUniformScale(parseFloat(e.target.value) || 1)}
                className="w-16 h-8 text-xs"
                step={0.1}
                min={0.1}
              />
            </div>
          </div>
          
          {['X', 'Y', 'Z'].map((axis, index) => (
            <div key={axis} className="space-y-2">
              <Label className="text-xs">{axis} Scale</Label>
              <div className="flex gap-2 items-center">
                <Slider
                  value={[modelData.scale[index]]}
                  onValueChange={([value]) => updateScale(index, value)}
                  min={0.1}
                  max={5}
                  step={0.1}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={modelData.scale[index].toFixed(1)}
                  onChange={(e) => updateScale(index, parseFloat(e.target.value) || 1)}
                  className="w-16 h-8 text-xs"
                  step={0.1}
                  min={0.1}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}