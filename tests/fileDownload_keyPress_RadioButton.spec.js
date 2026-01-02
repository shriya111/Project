import { resolve } from 'dns';
import { setSliderValue } from '../utils/silderValue';
import { rejects } from 'assert';
const { test , expect} = require('@playwright/test');
import fs from 'fs';
import path from 'path';
import { request } from 'http';
import { text } from 'stream/consumers';

test.beforeEach(async({ page },testInfo)=> {
    const mySite = "https://www.lambdatest.com/selenium-playground/";
    testInfo.setTimeout(testInfo.timeout + 3000);
  await page.goto(mySite, {waitUntil: 'domcontentloaded'});
});

test('download file' , async ({browser}, testInfo) =>{
const context = await browser.newContext({
    acceptDownloads: true
});
const page= await context.newPage();
const mySite = "https://www.lambdatest.com/selenium-playground/";
    testInfo.setTimeout(testInfo.timeout + 3000);
  await page.goto(mySite, {waitUntil: 'domcontentloaded'});
      await page.click('text=File Download'  , {
  button: 'left',
  modifiers: []
});
page.waitForLoadState('domcontentloaded');
  const dir ='C:\Users\shriylnu\Downloads';
 const generateButton= page.getByRole("button" , {name: 'Generate File'});
const textboxLocator = page.getByRole('textbox');
await textboxLocator.waitFor({state: 'attached'});
textboxLocator.click();
await textboxLocator.fill('limits for posts, messages, and titles. For example, Twitter has a limit of 280 characters, while Facebook allows up to 63,206 characters for status updates. Knowing how to count characters can help you stay within these limits. \n1\nWriting and Assignments: Character limits are often imposed in academic settings for essays and assignments. Tools like character counters can help ensure you meet these requirements without Writing and Assignments: Character limits are often imposed in academic settings for essays and assignments. Tools like character counters can help ensure you meet these requirements without');
await textboxLocator.pressSequentially('Social Media: Many platforms have character ');
expect(generateButton).toBeEnabled();
 page.getByRole('button', { name: 'Generate File' }).click();
const [download]= await Promise.all([
    page.waitForEvent('download'),
    page.click('#link-to-download')
     
])
const downloadPath = path.join(dir, await download.suggestedFilename());
 expect(download.suggestedFilename()).toBe('Lambdainfo.txt');
await download.saveAs(downloadPath);
console.log(downloadPath);
expect(fs.existsSync(downloadPath)).toBeTruthy();
});

test('key press' , async ({page}) =>{
      await page.click('text=Key Press'  , {
  button: 'left',
  modifiers: []
});
page.waitForLoadState('domcontentloaded');
const textarea= page.locator("#my_field");
await textarea.click();
await page.keyboard.type('}');
const re= page.locator('#result');
// console.log(await re.textContent());
await expect(re).toContainText('CLOSE_BRACKET');

});

test('radio button' , async ({page}) =>{
      await page.click('text=Radio Buttons Demo'  , {
  button: 'left',
  modifiers: []
});
page.waitForLoadState('domcontentloaded');
const radiobutton1 = page.getByRole('radio', { name: 'Female' }).first();
await radiobutton1.check();
const radioButtonResultbutton= page.getByRole('button', { name: 'Get value', exact: true });
await radioButtonResultbutton.click();
const firstRadio=radioButtonResultbutton.locator(' + p');
const valueOne=await firstRadio.textContent();
//console.log(valueOne);
await expect(valueOne).toContain('Female');
const radiobutton2= page.getByRole('radio', { name: 'Radio Button 2' });
await radiobutton2.click();
await expect(radiobutton2).toBeChecked();
const radiobutton3= page.getByRole('radio', { name: 'Disabled Radio Button' });
expect(radiobutton3).not.toBeChecked();
await page.getByRole('radio', { name: 'Female' }).nth(1).check();
await page.getByRole('radio', { name: 'to 50' }).check();
await page.getByRole('button', { name: 'Get values' }).click();
//console.log(await page.locator('p span.genderbutton').textContent());
await expect(page.locator('p span.genderbutton')).toContainText('Female');
await expect(page.locator('p span.groupradiobutton')).toContainText('50');
});





