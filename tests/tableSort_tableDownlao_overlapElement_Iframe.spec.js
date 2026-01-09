import { resolve } from 'dns';
import { setSliderValue } from '../utils/silderValue';
import { rejects } from 'assert';
const { test , expect} = require('@playwright/test');
import fs from 'fs';
import path from 'path';
import { request } from 'http';

test.beforeEach(async({ page },testInfo)=> {
    const mySite = "https://www.lambdatest.com/selenium-playground/";
    testInfo.setTimeout(testInfo.timeout + 3000);
  await page.goto(mySite, {waitUntil: 'domcontentloaded'});
});



test('Table download' , async ({browser}, testInfo) =>{
const context = await browser.newContext({
    acceptDownloads: true
});
const page= await context.newPage();
const mySite = "https://www.lambdatest.com/selenium-playground/";
    testInfo.setTimeout(testInfo.timeout + 3000);
  await page.goto(mySite, {waitUntil: 'domcontentloaded'});
      await page.click('text= Table Data Download'  , {
  button: 'left',
  modifiers: []
});
page.waitForLoadState('domcontentloaded');
 const dir ='C:\Users\shriylnu\Downloads';
const [download]= await Promise.all([
    page.waitForEvent('download'),
    page.click('.buttons-csv')
])
const downloadPath = path.join(dir, await download.suggestedFilename());
await download.saveAs(downloadPath);
//console.log(downloadPath);
expect(fs.existsSync(downloadPath)).toBeTruthy();
});


test('overlap element' , async ({page}) =>{
      await page.click('text= Overlapped Element'  , {
  button: 'left',
  modifiers: []
});
page.waitForLoadState('domcontentloaded');
const id = page.locator('#id');
const name = page.locator('#name');
const subject = page.locator('#subject');
await id.waitFor();
await id.fill("1");
await name.scrollIntoViewIfNeeded();
await subject.click({force: true});
await name.fill("shriya");
await subject.scrollIntoViewIfNeeded();
await subject.click({force: true});
await subject.fill("cse");
await expect(id).toHaveValue("1");
await expect(name).toHaveValue("shriya");
await expect(subject).toHaveValue("cse");
});

test('Table sort' , async ({page}) =>{
      await page.click('text=Table Sort & Search'  , {
  button: 'left',
  modifiers: []
});
page.waitForLoadState('domcontentloaded');
const searchbox = page.getByRole('searchbox', { name: 'Search:' });
const tableBody = page.locator('table#example tbody tr');
await searchbox.click();
await searchbox.fill("Software");
const count = await tableBody.count();
console.log(count);
await expect(tableBody).toHaveCount(2);
const firstRow = await tableBody.first().textContent();
console.log(firstRow);
expect(firstRow).toContain('Software')
await searchbox.fill("");
const age = page.locator('table#example th' , {hasText: 'Age'});
await age.click();
const ageSort = await tableBody.locator('td:nth-child(4)').allTextContents();
console.log(ageSort);
// const sortAge = [...ageSort].sort();
const sortAge = ageSort.sort();
expect(ageSort).toEqual(sortAge);

});

test('iframe' , async ({page}) => {
await page.click('text=iFrame Demo');
page.waitForLoadState('domcontentloaded');
const framel = await page.frameLocator('[id="iFrame1"]');
const textBox= framel.locator('.rsw-ce');
await textBox.fill("hi");
console.log(await textBox.textContent());
expect(await textBox.textContent()).toContain("hi");
});