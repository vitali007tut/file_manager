import { startCli } from './cli.js';

function parseArgs(argv) {
    const obj = {};
    for (const arg of argv) {
        if (arg.startsWith('--')) {
            const [key, value = ''] = arg.slice(2).split('=');
            obj[key] = value;
        }
    }
    return obj;
}

const args = parseArgs(process.argv.slice(2));
const username = args.username && args.username.trim() !== '' ? args.username : 'Anonimus';

console.log(`Welcome to the File Manager, ${username}!`);

startCli(username).catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
