import { BrowserWindow, dialog } from "electron";
import fs from 'fs';

export async function writeDocxFileFromUrl(url: string) {
    try {
        // Ask the user where to save the .docx file using Electron's dialog module
        const mainWindow = BrowserWindow.getFocusedWindow();
        const { filePath } = await dialog.showSaveDialog(mainWindow!, {
            title: 'Save as DOCX',
            filters: [{ name: 'Word Document', extensions: ['docx'] }],
        });

        // If the user selects a file path, fetch and save the file
        if (filePath) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
            }
            const buffer = await response.arrayBuffer();

            // Write the buffer to the file path chosen by the user
            await fs.promises.writeFile(filePath, Buffer.from(buffer));
            return filePath;
        }
    } catch (error) {
        console.error('Error saving DOCX:', error);
        // Handle the error more gracefully, perhaps showing an error dialog to the user
    }
}
