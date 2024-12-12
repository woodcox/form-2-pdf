import fs from 'fs';
import path from 'path';

export const preprocessFiles = () => {
  const filesToModify = [
    path.resolve('node_modules/fontkit/dist/module.mjs'),
  ];

  filesToModify.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      try {
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove duplicate keys or other problematic code
        content = content.replace(
          /(axisIndex:\s*\w+,\s*)(axisIndex:\s*\w+,)+/g,
          '$1' // Retain only the first occurrence
        );

        // Write the updated content back
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Processed ${filePath} to remove duplicate keys.`);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  });
};