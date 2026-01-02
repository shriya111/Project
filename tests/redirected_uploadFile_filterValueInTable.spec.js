const { test , expect} = require ('@playwright/test');
const { loadEnvFile } = require('node:process');

test.beforeEach(async ({page} , testInfo) =>{
    const mySite = "https://www.lambdatest.com/selenium-playground/";
    testInfo.setTimeout(testInfo.timeout+3000);
 await page.goto(mySite, {waitUntil : 'domcontentloaded'});
});




test('filter' , async ({page}) => {
const title = await page.title('Selenium Grid Online | Run Selenium Test On Cloud');
expect(title).toEqual('Selenium Grid Online | Run Selenium Test On Cloud');
await page.locator('text=Table Data Search').click();
const filter1= page.locator('#task-table-filter');
await filter1.fill("failed");
await filter1.press('Enter');
await page.waitForFunction(()=>{
    const rows = [...document.querySelectorAll('#task-table tbody tr')];
    const visible= rows.filter(r=> getComputedStyle(r).display !== 'none');
    return visible.length>=0;
})
const tableContent1 = await page.locator('#task-table tbody tr').evaluateAll(row => row.filter(rows => getComputedStyle(rows).display !== 'none').length);
console.log(tableContent1);
})

test('upload' , async ({page}) => {
const fileName= "C:\\Users\\shriylnu\\Downloads\\LambdaTest.pdf";
await page.locator('text=Upload File Demo').click();
const file= await page.locator('#file');
await file.setInputFiles(fileName);
const successLocator = await page.locator('text=File Successfully Uploaded');
//console.log(await successLocator.innerText());
await expect(successLocator).toBeVisible();
})

test('Redirected' , async ({ page }) => {
 await page.click('text=Redirection');
 const redirect= page.getByRole('link' , {name : 'here'});
 await Promise.all(
   [
     await  page.waitForLoadState("load"),
     redirect.click(),
   
   ])
console.log(page.url());
expect(page).toHaveURL("https://www.lambdatest.com/selenium-playground/");


})

