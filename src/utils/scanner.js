// File: veroGuard/src/utils/scanner.js
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

export async function scanNodeModules(projectPath) {
  const nodeModulesPath = path.join(projectPath, 'node_modules');
  const results = {
    externalAccesses: [],
    envAccesses: [],
  };

  try {
    const packages = await fs.readdir(nodeModulesPath);

    for (const pkg of packages) {
      const pkgPath = path.join(nodeModulesPath, pkg);
      const stats = await fs.stat(pkgPath);

      if (stats.isDirectory()) {
        const files = await glob('**/*.js', { cwd: pkgPath });

        for (const file of files) {
          const filePath = path.join(pkgPath, file);
          const content = await fs.readFile(filePath, 'utf8');

          // Check for external file access
          if (content.includes('fs.readFile') || content.includes('fs.readFileSync')) {
            results.externalAccesses.push(`${pkg}/${file}`);
          }

          // Check for .env file access
          if (content.includes('process.env') || content.includes('dotenv')) {
            results.envAccesses.push(`${pkg}/${file}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error scanning node_modules:', error);
  }

  return results;
}