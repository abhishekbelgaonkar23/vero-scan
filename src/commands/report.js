// File: veroGuard/src/commands/report.js
import { text, spinner } from '@clack/prompts';
import chalk from 'chalk';
import { generateReport } from '../utils/reporter.js';

export default async function report() {
  const projectPath = await text({
    message: 'Enter the path to your npm project:',
    initialValue: '.',
  });

  const s = spinner();
  s.start('Generating report');

  const reportContent = await generateReport(projectPath);

  s.stop('Report generated');

  console.log(chalk.green('Report:'));
  console.log(reportContent);
}