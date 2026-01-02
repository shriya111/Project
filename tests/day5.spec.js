const { test , expect} = require ('@playwright/test');
test.beforeEach(async ({page}, testInfo) => {
const mySite ="https://www.lambdatest.com/selenium-playground/";
testInfo.setTimeout(testInfo.timeout + 3000);
await page.goto(mySite , {waitUntil : 'domcontentloaded'});
});

test('form registartion' , async ({page}) => {
await page.click('text=Input Form Submit');
page.waitForLoadState('domcontentloaded');
 await page.fill('#name', 'shriya');
await page.locator('[id*="inputEmail4"]').fill("shriylnu@deoite.com");
await page.locator('[id*="inputPassword"]').fill("abef123");
await page.fill('#company' , 'XYZ');
await page.fill('#websitename' , 'XYZ');
await page.locator("select[name='country']").selectOption("India");
await page.fill('#inputCity' , 'Jalandhar');
await page.fill('#inputAddress1' , '20');
await page.fill('#inputAddress2' , 'deg');
await page.fill('#inputState' , 'Punjab');
await page.fill('#inputZip' , '123456');
await page.getByRole('button' , {name : 'Submit'}).click();
 const msg = await page.locator("[style*='block']").textContent();
 console.log(msg);
 expect(msg).toContain("Thanks");
})


test('iframe' , async ({page}) => {
await page.click('text=iFrame Demo');
page.waitForLoadState('domcontentloaded');
const framel = await page.frameLocator('[id="iFrame1"]');
const textBox= framel.locator('.rsw-ce');
await textBox.fill("hi");
console.log(await textBox.textContent());
expect(await textBox.textContent()).toContain("hi");
})

test.only('popup' , async ({browser}) => {
const context=browser.newContext();
const page=await context.newPage();
await page.click('text=Window Popup Modal');
//const [popup1]=await Promise.all();
page.waitForLoadState('domcontentloaded');

const [popup] = await Promise.all([
    context.waitForEvent('popup'),
    page.locator("a:has-Text('Follow On Twitter')").click()
]);

await popup.waitForLoadState();
console.log(await popup.title());
// const framel = await page.frameLocator('[id="iFrame1"]');
// const textBox= framel.locator('.rsw-ce');
// await textBox.fill("hi");
// console.log(await textBox.textContent());
// expect(await textBox.textContent()).toContain("hi");
})