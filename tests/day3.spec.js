const { test, expect } = require('@playwright/test');

test('Find broken images', async ({ page, playwright }) => {

  const apiContext = await playwright.request.newContext();
  await page.goto('https://example.com');

  const imageUrls = await page.$$eval('img', imgs =>
    imgs
      .map(img => img.src)
      .filter(src => src && src.startsWith('http'))
  );

  console.log(`Total images found: ${imageUrls.length}`);

  const brokenImages = [];

  for (const img of imageUrls) {
    try {
      const response = await apiContext.get(img);

      if (response.status() >= 400) {
        brokenImages.push(`${img} → ${response.status()}`);
      }
    } catch (e) {
      brokenImages.push(`${img} → REQUEST FAILED`);
    }
  }

  await apiContext.dispose();

  // ✅ Report AFTER checking all images
  if (brokenImages.length > 0) {
    console.log('\n❌ Broken Images Found:');
    brokenImages.forEach(img => console.log(img));
  }

  // ✅ Fail test ONCE (after loop)
  expect(brokenImages.length, 'Broken images detected').toBe(0);
});

const { test, expect } = require('@playwright/test');

test('Find all broken images (no timeout)', async ({ page, playwright }) => {

  const apiContext = await playwright.request.newContext({
    timeout: 5000   // ⬅️ important
  });

  await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });

  const imageUrls = await page.$$eval('img', imgs =>
    imgs
      .map(img => img.src)
      .filter(src => src && src.startsWith('http'))
  );

  console.log(`Total images found: ${imageUrls.length}`);

  const brokenImages = [];

  for (const img of imageUrls) {
    try {
      const response = await apiContext.get(img, { timeout: 5000 });

      if (response.status() >= 400) {
        brokenImages.push(`${img} → ${response.status()}`);
        console.log(`❌ Broken image: ${img}`);
      }
    } catch (err) {
      // ⬅️ request timed out or failed
      brokenImages.push(`${img} → TIMEOUT / FAILED`);
      console.log(`❌ Image failed or timed out: ${img}`);
    }
  }

  await apiContext.dispose();

  console.log('\nSummary:');
  console.log(`Broken images count: ${brokenImages.length}`);

  expect(brokenImages.length).toBe(0);
});

