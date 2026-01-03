const { test, expect } = require('@playwright/test');

test('Find broken links', async ({ page, request }) => {

  await page.goto('https://example.com');

  // Get all anchor tags
  const links = await page.$$eval('a', elements =>
    elements
      .map(el => el.href)
      .filter(href => href && href.startsWith('http'))
  );

  console.log(`Total links found: ${links.length}`);

  for (const link of links) {
    const response = await request.get(link);

    if (response.status() >= 400) {
      console.log(`❌ Broken Link: ${link} → ${response.status()}`);
    } else {
      console.log(`✅ Valid Link: ${link}`);
    }
  }
});
