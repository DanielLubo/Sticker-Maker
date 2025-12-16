export interface ImageCropperProps {
    imageFile: File;
    onImageProcessed: (processedFile: File) => void;
    outputSize?: number;
}