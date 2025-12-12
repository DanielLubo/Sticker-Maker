// React
import { useState, } from "react";
import type { ChangeEvent, JSX } from "react";

// Interface
import type { ImageUploaderProps } from "../../interfaces";

// Css
import styles from './ImageUploader.module.css';

export const ImageUploader = ({ onImageSelected, maxFileSize = 5000000, acceptedFormats = ["image/jpeg", "image/png", "image/webp"] }: ImageUploaderProps): JSX.Element => {

    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): string | null => {
        if (file.size > maxFileSize) {
            return 'El tamaño de la imagen es demasiado grande';
        };

        if (!acceptedFormats.includes(file.type)) {
            return `El formato de imagen no es valido: ${file.type}`;
        };

        return null;
    }

    const imagePreview = (file: File) => {
        // Creamos el lector para el archivo
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result as string;
            setPreview(result);
        };

        reader.readAsDataURL(file);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setError(null);

        const validationError = validateFile(file);

        if (validationError) {
            setError(validationError);
            setPreview(null);
            return;
        }

        imagePreview(file);
        onImageSelected(file);
    }

    return (
        <div className={styles.uploaderContainer}>
            <div className={styles.uploadArea}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.uploadInput}
                    id="file-upload"
                />
                <label htmlFor="file-upload" className={styles.uploadLabel}>
                    Seleccionar imagen
                </label>
                <p className={styles.uploadText}>
                    JPG, PNG o WebP (Máximo 5 MB)
                </p>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {preview && (
                <div className={styles.previewContainer}>
                    <img src={preview} alt="Preview" className={styles.preview} />
                </div>
            )}
        </div>
    )
}