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















