
const { test , expect} = require('@playwright/test');

import { request } from 'http';
import fs from 'fs';
import path from 'path';

test.beforeEach(async({ page },testInfo)=> {
    const mySite = "https://www.lambdatest.com/selenium-playground/";
    testInfo.setTimeout(testInfo.timeout + 3000);
  await page.goto(mySite, {waitUntil: 'domcontentloaded'});
});

test('download file' , async ({page }) =>{
await page.click('text=File Download');
const dir ='C:\Users\shriylnu\Downloads';
const generateButton= page.getByRole("button" , {name: 'Generate File'});
const textboxLocator = page.getByRole('textbox');
await textboxLocator.waitFor({state: 'attached'});
textboxLocator.click();
await textboxLocator.fill('limits for posts, messages, and titles. For example, Twitter has a limit of 280 characters, while Facebook allows up to 63,206 characters for status updates. Knowing how to count characters can help you stay within these limits. \n1\nWriting and Assignments: Character limits are often imposed in academic settings for essays and assignments. Tools like character counters can help ensure you meet these requirements without Writing and Assignments: Character limits are often imposed in academic settings for essays and assignments. Tools like character counters can help ensure you meet these requirements without');
await textboxLocator.pressSequentially('Social Media: Many platforms have character ');
expect(generateButton).toBeEnabled();
await page.getByRole('button', { name: 'Generate File' }).click();
const download10Promise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download' }).click();
  const download10 = await download10Promise;
   const fileName = download10.suggestedFilename();
   expect(fileName).toBe('Lambdainfo.txt');
   const filePath=path.join(dir,fileName);
   await download10.saveAs(filePath);
   expect(fs.existsSync(filePath)).toBeTruthy();

});

test('Select drop down' , async ({page }) =>{
await page.click('text=Select Dropdown List');
await page.waitForSelector('#select-demo');
await page.locator('#select-demo').selectOption('Thursday');
const multobox= page.locator('#multi-select');
await page.locator('#multi-select').waitFor();
await page.waitForSelector('#multi-select option[value="New York"]');
// await page.evaluate(()=>{
//     const selectele = document.querySelector('#multi-select');
//     if(selectele){
//         Array.from(selectele.options).forEach(options => {
//             if(['California', 'New York','Texas'].includes(options.value)){
//                 options.selected=true;
//             }
//         });
//         selectele.dispatchEvent(new Event('change' , {bubbles:true}));
//     }
// });
await page.keyboard.down('Control');
await page.locator('#multi-select option[value="New York"]');
await page.keyboard.down('SP');
await page.keyboard.up('Control');
  await page.getByRole('button', { name: 'First Selected' }).click();
    const firstSelected1 =  page.locator('span.genderbutton');
await expect(firstSelected1).not.toBeEmpty();
await expect(page.locator('span.genderbutton')).toHaveText('California');
});


// await page.locator('#multi-select').selectOption(['California', 'Florida', 'New Jersey', 'New York', 'Ohio', 'Texas', 'Pennsylvania', 'Washington']);
// await page.locator('#multi-select').selectOption(['California', 'Florida', 'New Jersey']);
// 
// await expect(page.locator('#multi-select')).toHaveValues(['California', 'Florida', 'New Jersey]);

// await page.locator('#multi-select').selectOption(['California', 'New York', 'Pennsylvania']);
// 
// await page.getByRole('button', { name: 'Get Last Selected' }).click();
// const firstSelectedButton = await page.getByRole('button', { name: 'First Selected' });
// await expect(firstSelectedButton).toBeEnabled();
// await page.getByRole('button', { name: 'First Selected' }).click();
// // page.waitForLoadState("domcontentloaded");


// const firstSelected = await page.locator('span.genderbutton').textContent();
// console.log(firstSelected);
// // await firstSelected.textContent();
// await expect(firstSelected).toBe('California');
// await page.getByRole('button', { name: 'Get Last Selected' }).click();
// const lastSelected = page.locator('span.groupradiobutton').textContent();
// // await lastSelected.textContent();
// expect(lastSelected).textContent().toContain('Washington');
// });