// File: veroGuard/src/commands/scan.js
import { text, spinner } from '@clack/prompts';
import chalk from 'chalk';
import { scanNodeModules } from '../utils/scanner.js';

export default async function scan() {
  const projectPath = await text({
    message: 'Enter the path to your npm project:',
    initialValue: '.',
  });

  const s = spinner();
  s.start('Scanning node_modules');

  const results = await scanNodeModules(projectPath);

  s.stop('Scan complete');

  console.log(chalk.green('Scan Results:'));
  console.log(JSON.stringify(results, null, 2));
}