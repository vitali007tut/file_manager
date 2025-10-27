import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import os from 'node:os';

export async function compress(filePath, destDir) {
    if (!filePath || !destDir) {
        console.log('Invalid input');
        return;
    }

    try {
        const fileName = path.basename(filePath);
        const homedir = os.homedir();
        const destPath = path.join(homedir, destDir, `${fileName}.br`);

        const source = fs.createReadStream(filePath);
        const destination = fs.createWriteStream(destPath);
        const brotli = zlib.createBrotliCompress();

        source.pipe(brotli).pipe(destination);

        await new Promise((resolve, reject) => {
            destination.on('finish', resolve);
            destination.on('error', reject);
        });
    } catch {
        console.error('Operation failed');
    }
}

export async function decompress(filePath, destDir) {
    if (!filePath || !destDir) {
        console.log('Invalid input');
        return;
    }
    try {
        const fileName = path.basename(filePath, '.br');
        const homedir = os.homedir();
        const destPath = path.join(homedir, destDir, fileName);

        const source = fs.createReadStream(filePath);
        const destination = fs.createWriteStream(destPath);
        const brotli = zlib.createBrotliDecompress();

        source.pipe(brotli).pipe(destination);

        await new Promise((resolve, reject) => {
            destination.on('finish', resolve);
            destination.on('error', reject);
        });
    } catch {
        console.error('Operation failed');
    }
}
