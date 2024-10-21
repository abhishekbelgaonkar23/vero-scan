// File: veroGuard/src/index.js
import { intro, outro, select } from '@clack/prompts';
import chalk from 'chalk';
import scan from './commands/scan.js';
import report from './commands/report.js';

async function main() {
  intro(chalk.bold('VeroGuard - npm project security audit'));

  const action = await select({
    message: 'What would you like to do?',
    options: [
      { value: 'scan', label: 'Scan node_modules' },
      { value: 'report', label: 'Generate report' },
    ],
  });

  switch (action) {
    case 'scan':
      await scan();
      break;
    case 'report':
      await report();
      break;
  }

  outro('Thank you for using VeroGuard!');
}

main().catch(console.error);