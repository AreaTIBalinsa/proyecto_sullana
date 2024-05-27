import { PDFDocument } from 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';
import * as pdfjsLib from 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/build/pdf.min.js';

document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64Pdf = e.target.result.split(',')[1];
        await renderPdfToImages(base64Pdf);
    };
    reader.readAsDataURL(file);
});

async function renderPdfToImages(base64Pdf) {
    const uint8ArrayPdf = base64ToUint8Array(base64Pdf);
    const pdfDoc = await PDFDocument.load(uint8ArrayPdf);
    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = ''; // Limpiar contenedor de imágenes

    const loadingTask = pdfjsLib.getDocument({ data: uint8ArrayPdf });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;

    for (let i = 0; i < pageCount; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        await page.render(renderContext).promise;

        // Convertir el canvas a una imagen y añadirla al contenedor
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        imagesContainer.appendChild(img);
    }
}

function base64ToUint8Array(base64) {
    const raw = atob(base64);
    const uint8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}