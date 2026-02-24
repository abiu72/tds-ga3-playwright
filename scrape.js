const { chromium } = require('playwright-chromium');
const seeds = ["64","65","66","67","68","69","70","71","72","73"];
(async () => {
  const browser = await chromium.launch();
  let total = 0;
  for (const seed of seeds) {
    const page = await browser.newPage();
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`, { waitUntil: 'networkidle' });
    // Wait for table to render (JS-generated)
    await page.waitForSelector('table', { timeout: 10000 });
    await page.waitForTimeout(1000);
    const cells = await page.$$eval('td', tds => tds.map(td => parseFloat(td.textContent) || 0));
    const sum = cells.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: ${cells.length} cells, sum = ${sum}`);
    total += sum;
    await page.close();
  }
  await browser.close();
  console.log(`Total sum: ${total}`);
  console.log(total);
})();
