import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File } from 'lucide-react';
import { toast } from 'sonner';

interface ModelUploaderProps {
  onUpload: (file: File) => void;
}

export function ModelUploader({ onUpload }: ModelUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      if (fileSize > 50) {
        toast.error('File size must be less than 50MB');
        return;
      }
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/gltf-binary': ['.glb'],
      'model/gltf+json': ['.gltf'],
      'application/octet-stream': ['.obj', '.fbx'],
      'text/plain': ['.obj']
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  return (
    <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center space-y-4 cursor-pointer"
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-2">
            <div className="p-4 rounded-full bg-primary/10">
              {isDragActive ? (
                <Upload className="h-8 w-8 text-primary animate-bounce" />
              ) : (
                <File className="h-8 w-8 text-primary" />
              )}
            </div>
            
            <div className="text-center">
              <h3 className="font-medium">
                {isDragActive ? 'Drop your model here' : 'Upload 3D Model'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop or click to browse
              </p>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            <p>Supported formats: GLTF, GLB, OBJ, FBX</p>
            <p>Max file size: 50MB</p>
          </div>
          
          <Button variant="outline" size="sm" type="button">
            Browse Files
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}