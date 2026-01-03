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
  //console.log("hi");
});

test('Select drop down' , async ({page }) =>{
    await page.click('text=Select Dropdown List'  , {
  button: 'left',
  modifiers: []
});
await page.waitForSelector('#select-demo');
await page.locator('#select-demo').selectOption('Thursday');
await expect(page.locator('.selected-value')).toContainText('Thursday');
console.log(await page.locator('.selected-value').textContent());
 const multobox= await page.locator('#multi-select').hover();
//await multobox.click();
  await page.keyboard.down('Control');
await page.locator('text=Florida').click();
await page.locator('text=California').click();
await page.locator('text=New Jersey').click();
  await page.keyboard.up('Control');
await page.keyboard.press('Escape');
  await page.getByRole('button' , {name: 'First Selected'}).click({force: true});
   await page.getByRole('button' , {name: 'Get Last Selected'}).click({force: true});
   const firstSelected = page.locator('.genderbutton');
   expect(firstSelected).toContainText('Florida');
   const allSelected = page.locator('.groupradiobutton');
   expect(allSelected).toContainText('Florida,California,New Jersey');
});

test('popup' , async ({context} , testInfo) => {
const page=await context.newPage();
 const mySite = "https://www.lambdatest.com/selenium-playground/";
    testInfo.setTimeout(testInfo.timeout + 3000);
  await page.goto(mySite, {waitUntil: 'domcontentloaded'});
    await page.click('text=Window Popup Modal'  , {
  button: 'left',
  modifiers: []
});

const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.locator("a:has-Text('Follow On Twitter')").click()
])
await newPage.waitForLoadState();
console.log(await newPage.title());
console.log(await page.title());
await newPage.close();
})