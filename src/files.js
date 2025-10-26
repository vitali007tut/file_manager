import fs from 'node:fs/promises';
import fss from 'node:fs';
import path from 'node:path';

export async function cat(filePath) {
    try {
        const fullPath = path.resolve(process.cwd(), filePath);
        const stream = fss.createReadStream(fullPath, { encoding: 'utf8' });
        stream.on('error', () => console.error('Operation failed'));
        stream.pipe(process.stdout);
        await new Promise((resolve) => stream.on('end', resolve));
        console.log();
    } catch {
        console.error('Operation failed');
    }
}

export async function add(fileName) {
    try {
        const fullPath = path.resolve(process.cwd(), fileName);
        await fs.writeFile(fullPath, '');
    } catch {
        console.error('Operation failed');
    }
}

export async function mkdir(dirName) {
    try {
        const fullPath = path.resolve(process.cwd(), dirName);
        await fs.mkdir(fullPath, { recursive: false });
    } catch {
        console.error('Operation failed');
    }
}

export async function rn(filePath, newName) {
    try {
        const fullPath = path.resolve(process.cwd(), filePath);
        const dir = path.dirname(fullPath);
        const newPath = path.join(dir, newName);
        await fs.rename(fullPath, newPath);
    } catch {
        console.error('Operation failed');
    }
}

export async function cp(filePath, destDir) {
    try {
        const sourcePath = path.resolve(process.cwd(), filePath);
        const destPath = path.resolve(process.cwd(), destDir, path.basename(filePath));

        await fs.access(sourcePath);
        const readable = fss.createReadStream(sourcePath);
        const writable = fss.createWriteStream(destPath);

        await new Promise((resolve, reject) => {
            readable.pipe(writable);
            writable.on('finish', resolve);
            writable.on('error', reject);
            readable.on('error', reject);
        });
    } catch {
        console.error('Operation failed');
    }
}

export async function mv(filePath, destDir) {
    try {
        await cp(filePath, destDir);
        await rm(filePath);
    } catch {
        console.error('Operation failed');
    }
}

export async function rm(filePath) {
    try {
        const fullPath = path.resolve(process.cwd(), filePath);
        await fs.unlink(fullPath);
    } catch {
        console.error('Operation failed');
    }
}
