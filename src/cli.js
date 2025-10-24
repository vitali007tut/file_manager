import readline from 'node:readline';
import os from 'node:os';
import path from 'node:path';

export async function startCli(username) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
    });

    function printCwd() {
        const cwd = process.cwd();
        console.log(`You are currently in ${cwd}`);
    }

    try {
        process.chdir(os.homedir());
    } catch (err) {
    }

    printCwd();
    rl.prompt();

    rl.on('line', (line) => {
        const input = line.trim();

        if (input === '.exit') {
            rl.close();
            return;
        }

        if (!input) {
            printCwd();
            rl.prompt();
            return;
        }

        console.log('Invalid input');
        printCwd();
        rl.prompt();
    });

    rl.on('close', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    });

    process.on('SIGINT', () => {
        rl.close();
    });
}
