import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Image, FileCode, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { ModelData } from '@/pages/ModelEditor';

interface ModelExportProps {
  modelData: ModelData;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function ModelExport({ modelData, canvasRef }: ModelExportProps) {
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg' | 'json'>('png');
  const [isExporting, setIsExporting] = useState(false);

  const exportScreenshot = async (format: 'png' | 'jpg') => {
    if (!canvasRef.current) {
      toast.error('No canvas found for export');
      return;
    }

    setIsExporting(true);
    try {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`);
      
      const link = document.createElement('a');
      link.download = `3d-model-${Date.now()}.${format}`;
      link.href = dataURL;
      link.click();
      
      toast.success(`Screenshot exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Failed to export screenshot');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportModelData = () => {
    setIsExporting(true);
    try {
      const exportData = {
        model: {
          ...modelData,
          url: undefined, // Don't include the blob URL
          fileName: modelData.file?.name || 'unknown'
        },
        timestamp: new Date().toISOString(),
        version: '1.0'
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.download = `3d-model-config-${Date.now()}.json`;
      link.href = URL.createObjectURL(dataBlob);
      link.click();
      
      toast.success('Model configuration exported');
    } catch (error) {
      toast.error('Failed to export model data');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const saveToLocalStorage = () => {
    try {
      const saveData = {
        ...modelData,
        url: undefined, // Don't save the blob URL
        fileName: modelData.file?.name || 'unknown',
        savedAt: new Date().toISOString()
      };

      const savedModels = JSON.parse(localStorage.getItem('savedModels') || '[]');
      savedModels.push(saveData);
      
      // Keep only last 10 saved models
      if (savedModels.length > 10) {
        savedModels.splice(0, savedModels.length - 10);
      }
      
      localStorage.setItem('savedModels', JSON.stringify(savedModels));
      toast.success('Model saved to browser storage');
    } catch (error) {
      toast.error('Failed to save model');
      console.error('Save error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Format Selection */}
          <div className="space-y-3">
            <Label className="text-xs">Export Format</Label>
            <Select value={exportFormat} onValueChange={(value: 'png' | 'jpg' | 'json') => setExportFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    PNG Image
                  </div>
                </SelectItem>
                <SelectItem value="jpg">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    JPG Image
                  </div>
                </SelectItem>
                <SelectItem value="json">
                  <div className="flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    JSON Config
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Actions */}
          <div className="space-y-3">
            {exportFormat === 'json' ? (
              <Button 
                onClick={exportModelData}
                disabled={isExporting || !modelData.url}
                className="w-full"
                variant="default"
              >
                <FileCode className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export Configuration'}
              </Button>
            ) : (
              <Button 
                onClick={() => exportScreenshot(exportFormat)}
                disabled={isExporting || !modelData.url}
                className="w-full"
                variant="default"
              >
                <Image className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
              </Button>
            )}

            {/* Save to Browser */}
            <Button 
              onClick={saveToLocalStorage}
              disabled={!modelData.url}
              className="w-full"
              variant="outline"
            >
              <Save className="h-4 w-4 mr-2" />
              Save to Browser
            </Button>
          </div>

          {/* Export Info */}
          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
            <p className="font-medium mb-1">Export Information:</p>
            <ul className="space-y-1">
              <li>• PNG/JPG: Screenshot of current view</li>
              <li>• JSON: Model settings and transformations</li>
              <li>• Save: Store in browser for later use</li>
            </ul>
          </div>

          {!modelData.url && (
            <div className="text-xs text-amber-600 p-3 bg-amber-50 dark:bg-amber-900/20 rounded">
              Upload a 3D model to enable export options
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
