const { chromium } = require('playwright-chromium');
const seeds = ["74","75","76","77","78","79","80","81","82","83"];
(async () => {
  const browser = await chromium.launch();
  let total = 0;
  for (const seed of seeds) {
    const page = await browser.newPage();
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`, { waitUntil: 'networkidle' });
    const cells = await page.$$eval('td', tds => tds.map(td => parseInt(td.textContent) || 0));
    total += cells.reduce((a, b) => a + b, 0);
    await page.close();
  }
  await browser.close();
  console.log(total);
})();
