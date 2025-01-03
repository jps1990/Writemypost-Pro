import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import type { UploadedImage } from '@/lib/types';

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  value?: UploadedImage | null;
  onRemove?: () => void;
  className?: string;
}

export function FileDropzone({ onDrop, value, onRemove, className }: FileDropzoneProps) {
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col items-center justify-center w-full h-[400px] rounded-lg border-2 border-dashed hover:border-primary/50 transition-colors',
        isDragActive && 'border-primary/50 bg-primary/5',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">
          Glissez-déposez une image ici ou cliquez pour sélectionner
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG ou GIF jusqu'à 10MB
        </p>
      </div>
    </div>
  );
}