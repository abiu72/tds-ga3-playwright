const { chromium } = require('playwright-chromium');
const seeds = ["87","88","89","90","91","92","93","94","95","96"];
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
