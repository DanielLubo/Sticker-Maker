export interface ImageFile {
    file: File;
    name: string;
    size: number;
    type: string;
    preview: string;
}

export interface ImageUploaderProps {
    onImageSelected: (file: File) => void;
    maxFileSize?: number;
    acceptedFormats?: string[];
}