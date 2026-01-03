const { test } = require('@playwright/test');

test('Find broken images', async ({ page, playwright }) => {

  // Create API request context
  const apiContext = await playwright.request.newContext();

  await page.goto('https://example.com');

  // Collect all image URLs
  const imageUrls = await page.$$eval('img', imgs =>
    imgs
      .map(img => img.src)
      .filter(src => src && src.startsWith('http'))
  );

  console.log(`Total images found: ${imageUrls.length}`);

  for (const img of imageUrls) {
    try {
      const response = await apiContext.get(img);

      if (response.status() >= 400) {
        console.log(`❌ Broken Image: ${img} → ${response.status()}`);
      }
    } catch (e) {
      console.log(`❌ Failed to load image: ${img}`);
    }
  }

  await apiContext.dispose();
});
