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

test('Drag and drop' , async({page}) => {
await page.locator('text=Drag & Drop Sliders').click();
// const silder1= page.locator('#slider1');
const silder = await setSliderValue(page,1);
 const value = '16';
await silder.getByRole('slider').fill(value);
await silder.dispatchEvent('input');
const slider1Value= silder.locator('output');
await page.waitForFunction( (data )=> {
    const ele = document.querySelector(data.selector);
    return ele && ele.textContent.includes(data.expectedValue);
},{ selector: 'output' , expectedValue: value });
await expect(slider1Value).toHaveText(value);
})



test('Alert' , async({page}) => {
    await page.locator('text=Javascript Alerts').click();

//await page.locator('text=Click Me').first().click();
//await page.getByRole('button' , {name: 'Click Me'}).first().click();
 // await page.getByRole('paragraph').filter({ hasText: 'JavaScript AlertsClick Me' }).getByRole('button').click();
await page.waitForLoadState('domcontentloaded');
const [dialog]= await Promise.all([
    page.waitForEvent('dialog'),
      await page.getByRole('paragraph').filter({ hasText: 'JavaScript AlertsClick Me' }).getByRole('button').click()
//page.locator('button').filter({hasText: 'Click Me'}).first().click()
]);
await expect(dialog.type()).toBe('alert');
await  expect(dialog.message()).toBe('I am an alert box');
 await dialog.accept();
await expect(page.locator('[id="__next"]')).toContainText('Click Me');

        
});

// page.once('dialog', dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
//   await page.getByRole('paragraph').filter({ hasText: 'JavaScript AlertsClick Me' }).getByRole('button').click();
// page.once('dialog', dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
//   await page.getByRole('paragraph').filter({ hasText: 'Confirm box:Click Me' }).getByRole('button').click();
// page.once('dialog', dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
//   await page.getByRole('paragraph').filter({ hasText: 'Prompt box:Click Me' }).getByRole('button').click();

test('drop down' , async ({page}) =>{
    const selectionOne="India";
await page.getByRole('link', { name: 'JQuery Select dropdown' }).click();
await page.locator('.select2-selection--single').first().click();
await page.getByRole('textbox').nth(1).fill('in');
await page.getByRole('treeitem', { name: selectionOne }).click();
//await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
await page.locator('.select2-selection--single').nth(1).click();
await page.getByRole('textbox', { name: 'Select state(s)' }).fill('cal');
await page.getByRole('treeitem', { name: 'California' }).click();
await page.getByRole('textbox').fill('oh');
await page.getByRole('treeitem', { name: 'Ohio' }).click();
await page.getByTitle('Puerto Rico').click();
// await page.getByRole('treeitem', { name: 'United States Minor Outlying' }).click();
// await page.getByRole('treeitem', { name: 'United States Minor Outlying' }).click();
await page.getByLabel('Select a file').selectOption('jquery');
})

    

test('Hover Demo' , async ({page}) =>{
     await page.click('text=Hover Demo');
//await page.getByRole('link', { name: 'Hover Demo' }).click();
await page.getByRole('link', { name: 'Hover Me' }).first().click();
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


test('Broken image' , async ({page , request}) =>{
await page.click('text=Broken Image');
await page.waitForSelector('img');
await page.evaluate(()=> window.scrollTo(0,document.documentElement.scrollHeight));
const images= await page.locator('img').all();
  const brokenimages= [];
  const requestPromise = images.map(async (img) => {
    const src= await img.getAttribute('src');
     if(!src){
        return;
    }
    const imageUrl = new URL(src,page.url()).href;
     const response = await request.get(imageUrl);
    if(response.status() != 200){
        brokenimages.push(imageUrl);
        console.log(`broken image : ${imageUrl}`);
    }
  });
  await Promise.all(requestPromise);
  expect(brokenimages.length).toBe(0);


});