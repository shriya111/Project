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