import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Stage } from '@react-three/drei';
import { Model3DViewer } from '@/components/3d/Model3DViewer';
import { ModelControls } from '@/components/3d/ModelControls';
import { ModelUploader } from '@/components/3d/ModelUploader';
import { ModelTransforms } from '@/components/3d/ModelTransforms';
import { ModelMaterials } from '@/components/3d/ModelMaterials';
import { ModelLighting } from '@/components/3d/ModelLighting';
import { ModelAnimations } from '@/components/3d/ModelAnimations';
import { ModelExport } from '@/components/3d/ModelExport';
import { useAnimationSettings } from '@/hooks/useAnimationSettings';
import { AnimationToggle } from '@/components/3d/AnimationToggle';
import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { FileUp, Palette, Sun, Play, Download, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export interface ModelData {
  url?: string;
  file?: File;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  roughness: number;
  metalness: number;
  emissive: string;
}

export default function ModelEditor() {
  const { enableAnimations, setEnableAnimations } = useAnimationSettings();
  const [modelData, setModelData] = useState<ModelData>({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    color: '#ffffff',
    roughness: 0.5,
    metalness: 0.5,
    emissive: '#000000'
  });
  
  const [lightIntensity, setLightIntensity] = useState(1);
  const [lightColor, setLightColor] = useState('#ffffff');
  const [lightPosition, setLightPosition] = useState<[number, number, number]>([10, 10, 5]);
  
  const [animations, setAnimations] = useState({
    rotate: false,
    bounce: false,
    hover: false,
    speed: 1
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleModelUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setModelData(prev => ({ ...prev, file, url }));
    toast.success('Model uploaded successfully!');
  };

  const resetModel = () => {
    setModelData({
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#ffffff',
      roughness: 0.5,
      metalness: 0.5,
      emissive: '#000000'
    });
    setAnimations({
      rotate: false,
      bounce: false,
      hover: false,
      speed: 1
    });
    toast.info('Model reset to defaults');
  };

  return (
    <>
      <SEO 
        title="3D Model Editor - AI App Builder"
        description="Upload, edit, and customize 3D models with our powerful web-based editor. Change materials, lighting, animations and export your creations."
      />
      
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                3D Model Editor
              </h1>
              <p className="text-muted-foreground text-lg">
                Upload, customize, and export 3D models with professional-grade tools
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <AnimationToggle 
                enableAnimations={enableAnimations}
                onToggle={setEnableAnimations}
              />
              <Button 
                variant="outline" 
                onClick={resetModel}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[80vh]">
            {/* 3D Viewport */}
            <div className="lg:col-span-3">
              <Card className="h-full glass">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <span>3D Viewport</span>
                    <div className="text-sm text-muted-foreground font-normal">
                      Drag to rotate • Scroll to zoom • Right-click to pan
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-5rem)] p-4">
                  <div className="h-full rounded-lg overflow-hidden border">
                    <Canvas
                      ref={canvasRef}
                      camera={{ position: [5, 5, 5], fov: 50 }}
                      dpr={[1, 2]}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Suspense fallback={null}>
                        <Environment preset="city" />
                        <ambientLight intensity={0.4} />
                        <directionalLight 
                          position={lightPosition}
                          intensity={lightIntensity}
                          color={lightColor}
                          castShadow
                        />
                        
                        <Stage 
                          intensity={0.5}
                          environment="city"
                          shadows="contact"
                          adjustCamera={false}
                        >
                          {modelData.url && (
                            <Model3DViewer
                              modelData={modelData}
                              animations={animations}
                              enableAnimations={enableAnimations}
                            />
                          )}
                        </Stage>
                        
                        <Grid 
                          infiniteGrid 
                          cellSize={1} 
                          cellThickness={0.5}
                          fadeDistance={50}
                          fadeStrength={0.8}
                        />
                        
                        <OrbitControls
                          enablePan={true}
                          enableZoom={true}
                          enableRotate={true}
                          minDistance={2}
                          maxDistance={50}
                          autoRotate={false}
                        />
                      </Suspense>
                    </Canvas>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="lg:col-span-1">
              <Card className="h-full glass">
                <CardHeader className="pb-4">
                  <CardTitle>Control Panel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 overflow-y-auto max-h-[calc(100%-5rem)]">
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload" className="text-xs">
                        <FileUp className="h-3 w-3 mr-1" />
                        Upload
                      </TabsTrigger>
                      <TabsTrigger value="export" className="text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upload" className="space-y-4">
                      <ModelUploader onUpload={handleModelUpload} />
                    </TabsContent>
                    
                    <TabsContent value="export" className="space-y-4">
                      <ModelExport 
                        modelData={modelData}
                        canvasRef={canvasRef}
                      />
                    </TabsContent>
                  </Tabs>

                  {modelData.url && (
                    <>
                      <Separator />
                      
                      <Tabs defaultValue="transform" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="transform" className="text-xs">Transform</TabsTrigger>
                          <TabsTrigger value="material" className="text-xs">
                            <Palette className="h-3 w-3 mr-1" />
                            Material
                          </TabsTrigger>
                        </TabsList>
                        <TabsList className="grid w-full grid-cols-2 mt-2">
                          <TabsTrigger value="lighting" className="text-xs">
                            <Sun className="h-3 w-3 mr-1" />
                            Lighting
                          </TabsTrigger>
                          <TabsTrigger value="animation" className="text-xs">
                            <Play className="h-3 w-3 mr-1" />
                            Animation
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="transform" className="space-y-4">
                          <ModelTransforms
                            modelData={modelData}
                            onUpdate={setModelData}
                          />
                        </TabsContent>
                        
                        <TabsContent value="material" className="space-y-4">
                          <ModelMaterials
                            modelData={modelData}
                            onUpdate={setModelData}
                          />
                        </TabsContent>
                        
                        <TabsContent value="lighting" className="space-y-4">
                          <ModelLighting
                            intensity={lightIntensity}
                            color={lightColor}
                            position={lightPosition}
                            onIntensityChange={setLightIntensity}
                            onColorChange={setLightColor}
                            onPositionChange={setLightPosition}
                          />
                        </TabsContent>
                        
                        <TabsContent value="animation" className="space-y-4">
                          <ModelAnimations
                            animations={animations}
                            onUpdate={setAnimations}
                            enableAnimations={enableAnimations}
                          />
                        </TabsContent>
                      </Tabs>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}