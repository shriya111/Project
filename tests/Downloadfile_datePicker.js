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


test('Download file' , async ({page}) =>{
    const dir ='C:\Users\shriylnu\Downloads';
      await page.click('text=Download File Demo');
const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download File' }).click();
  const download = await downloadPromise;
 const fileName = download.suggestedFilename();
 expect(fileName).toBe('LambdaTest.pdf');
 const filePath=path.join(dir,fileName);
 await download.saveAs(filePath);
 expect(fs.existsSync(filePath)).toBeTruthy();
});


test('Date picker' , async ({page}) =>{
await page.click('text=Bootstrap Date Picker');
const birthdayValue='2000-09-20';
const today = new Date();
const currentYear=today.getFullYear();
const startDateYear='2030';
const startDateMonth = "Feburary";
const finalStartDateMonth=startDateMonth.substring(0,3);
const startDate='20';
const endDateMonth = "September";
const endStartDateMonth=endDateMonth.substring(0,3);
const endDate='20';
const monthName=today.toLocaleString('default',{month: 'long'});
await page.getByRole('textbox', { name: 'Birthday:' }).fill(birthdayValue);
const startDatetext= page.getByRole('textbox', { name: 'Start date' });
await startDatetext.waitFor({state:'visible', timeout: 1000});
await startDatetext.click();
await page.getByRole('columnheader', { name: monthName }).click();
await page.getByRole('columnheader', { name: currentYear }).click();
 await page.getByRole('columnheader', { name: '»' }).click();
await page.getByRole('cell').getByText(startDateYear).click();
await page.getByText(finalStartDateMonth).click();
 const startDateLocator= page.getByRole('cell', { name: startDate ,exact: true});
 const a = await startDateLocator.getAttribute('class');
// while(await startDateLocator.getAttribute('class').then(attr=> attr.includes('disabled'))){
//     const b = parseInt(startDate,10);
//     const c = b.toString();
//     await page.getByRole('cell', { name: c  ,exact: true}).click();
// }
 await startDateLocator.click();
await page.getByRole('textbox', { name: 'End date' }).click();
await page.getByRole('columnheader', { name: finalStartDateMonth }).click();
 await page.getByText(endStartDateMonth).click();
  const endDateLocator=page.getByRole('cell', { name: endDate });
await expect(endDateLocator).toBeEnabled();
await endDateLocator.click();
 await page.locator('#footer').click();
});


