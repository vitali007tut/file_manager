import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

export async function up() {
    const currentDir = process.cwd();
    const homedir = os.homedir()
    const parentDir = path.dirname(currentDir);
    if (homedir !== currentDir) {
        try {
            process.chdir(parentDir);
        } catch {
            console.error('Operation failed');
        }
    }
}

export async function cd(targetPath) {
    try {
        const newPath = path.isAbsolute(targetPath) ? targetPath : path.resolve(process.cwd(), targetPath);

        const stat = await fs.stat(newPath);
        if (stat.isDirectory()) {
            process.chdir(newPath);
        } else {
            console.error('Operation failed');
        }
    } catch {
        console.error('Operation failed');
    }
}

export async function ls() {
    try {
        const dir = process.cwd();
        const entries = await fs.readdir(dir, { withFileTypes: true });

        const folders = [];
        const files = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                folders.push({ Name: entry.name, Type: 'directory' });
            } else {
                files.push({ Name: entry.name, Type: 'file' });
            }
        }

        const sorted = [
            ...folders.sort((a, b) => a.Name.localeCompare(b.Name)),
            ...files.sort((a, b) => a.Name.localeCompare(b.Name)),
        ];

        console.table(sorted);
    } catch {
        console.error('Operation failed');
    }
}
