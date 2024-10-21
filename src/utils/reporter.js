// File: veroGuard/src/utils/reporter.js
import { scanNodeModules } from './scanner.js';
import chalk from 'chalk';

export async function generateReport(projectPath) {
  const results = await scanNodeModules(projectPath);

  let report = chalk.bold('VeroGuard Security Audit Report\n\n');

  report += chalk.yellow('Files accessing external resources:\n');
  if (results.externalAccesses.length > 0) {
    results.externalAccesses.forEach(file => {
      report += `  - ${file}\n`;
    });
  } else {
    report += '  No files found accessing external resources.\n';
  }

  report += '\n';

  report += chalk.yellow('Files accessing environment variables:\n');
  if (results.envAccesses.length > 0) {
    results.envAccesses.forEach(file => {
      report += `  - ${file}\n`;
    });
  } else {
    report += '  No files found accessing environment variables.\n';
  }

  return report;
}