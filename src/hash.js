import fs from 'node:fs';
import crypto from 'node:crypto';

export async function hash(filePath) {
    if (!filePath) {
        console.log('Invalid input');
        return;
    }
    try {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (chunk) => hash.update(chunk));
        await new Promise((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject);
        });

        console.log(hash.digest('hex'));
    } catch {
        console.error('Operation failed');
    }
}
