import readline from 'node:readline';
import os from 'node:os';
import { up, cd, ls } from './navigate.js';

export async function startCli(username) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
    });

    function printCwd() {
        console.log(`You are currently in ${process.cwd()}`);
    }

    try {
        process.chdir(os.homedir());
    } catch {}

    printCwd();
    rl.prompt();

    rl.on('line', async (line) => {
        const input = line.trim();

        if (input === '.exit') {
            rl.close();
            return;
        }

        const [command, ...args] = input.split(' ');

        try {
            switch (command) {
                case 'up':
                    await up();
                    break;
                case 'cd':
                    if (!args[0]) throw new Error('Invalid input');
                    await cd(args.join(' '));
                    break;
                case 'ls':
                    await ls();
                    break;
                case '':
                    break;
                default:
                    console.log('Invalid input');
            }
        } catch {
            console.error('Operation failed');
        }

        printCwd();
        rl.prompt();
    });

    rl.on('close', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    });

    process.on('SIGINT', () => rl.close());
}