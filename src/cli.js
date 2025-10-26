import readline from 'node:readline';
import os from 'node:os';
import { up, cd, ls } from './navigate.js';
import { cat, add, mkdir, rn, cp, mv, rm } from './files.js';
import { osInfo } from './systemInfo.js';

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
            if (command === 'os') {
                if (!args[0]) {
                    console.log('Invalid input');
                } else {
                    osInfo(args[0]);
                }
            } else {
                switch (command) {
                    case 'cat':
                        await cat(args[0]);
                        break;
                    case 'add':
                        await add(args[0]);
                        break;
                    case 'mkdir':
                        await mkdir(args[0]);
                        break;
                    case 'rn':
                        await rn(args[0], args[1]);
                        break;
                    case 'cp':
                        await cp(args[0], args[1]);
                        break;
                    case 'mv':
                        await mv(args[0], args[1]);
                        break;
                    case 'rm':
                        await rm(args[0]);
                        break;
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
