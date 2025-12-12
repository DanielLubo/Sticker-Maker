// React
import { useState } from "react";
import type { JSX } from "react";

// Components
import { ImageUploader } from "./components";

// Css
import styles from './App.module.css';

const App = (): JSX.Element => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageSelected = (file: File) => {
        console.log(`Imagen seleccionada:  ${file.name}`);
        setSelectedFile(file);
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>App Sticker Maker</h1>
                <p className={styles.subtitle}>Crea stickers para WhatsApp fácilmente</p>
            </header>

            <div className={styles.content}>
                <ImageUploader onImageSelected={handleImageSelected} />

                {selectedFile && (
                    <div className={styles.fileInfo}>
                        <h2>Archivo Seleccionado</h2>
                        <p><strong>Nombre:</strong> {selectedFile.name}</p>
                        <p><strong>Tamaño:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p><strong>Tipo:</strong> {selectedFile.type}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;