import { defineConfig } from '@playwright/test';
const fixtures = Boolean(process.env.NOTEBOOK_FIXTURES);
export default defineConfig({
  testDir: './tests', testMatch: fixtures ? 'publishing.spec.ts' : 'site.spec.ts',
  fullyParallel: true, workers: 2, reporter: 'list',
  use: { baseURL: fixtures ? 'http://localhost:4322' : 'http://localhost:4321', channel: 'chrome', screenshot: 'only-on-failure' },
  webServer: { command: fixtures ? 'npm run preview -- --host 127.0.0.1 --port 4322 --outDir .local/fixture-dist' : 'npm run preview -- --host 127.0.0.1 --port 4321', url: fixtures ? 'http://localhost:4322' : 'http://localhost:4321', reuseExistingServer: false },
});
