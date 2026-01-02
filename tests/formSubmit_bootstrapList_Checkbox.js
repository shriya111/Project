import { toList } from '../utils/conversion';
const { test , expect } = require('@playwright/test');
test.beforeEach(async({ page })=> {
  await page.goto("https://www.lambdatest.com/selenium-playground/");
});


test('Ajax form submit' , async ({ page}) => {
await page.click('text=Ajax Form Submit');
await page.fill('#title' , 'shriya');
await page.fill('#description' , 'Hi I am shriya');
await page.click('#btn-submit');
const status = page.locator('#submit-control');
await expect(status).toContainText('Ajax Request');
})

 test('Bootstrap list' , async ({ page}) => {
const leftItem="Kedungjenar";
 await page.click('text=Bootstrap List Box');
 await page.getByText(leftItem).click();
 await page.getByRole('button', { name: '>' }).nth(1).click();
 await page.locator(".dual-list.list-right ul").first().waitFor();
const rightList= await page.locator(".dual-list.list-right ul").innerText();
//console.log(rightList); 
expect(rightList).toContain(leftItem);
await page.getByText('All', { exact: true }).nth(1).click();
await page.getByRole('button', { name: '>' }).first().click();
await page.locator(".dual-list.list-left ul").first().waitFor();
const leftList = await page.locator(".dual-list.list-left ul").innerText();
//console.log("       ");
//await page.getByRole('link', { name: 'Checkbox Demo' }).click();
//console.log(leftList);
 const leftList1=toList(leftList);
 const rightList1=toList(rightList);
expect(leftList1).toEqual(expect.arrayContaining(rightList1));
 })

test('Checkbox' , async ({ page}) => {
 await page.click('text=Checkbox Demo');
 const i= 0;
 await page.getByRole('checkbox', { name: 'Click on check box' }).check();
 //const checbox1Status=  await page.getByRole('checkbox', { name: 'Click on check box' }).isChecked();
 //console.log(checbox1Status);
 //expect(checbox1Status).toBeTruthy();
  expect(page.getByText('Checked')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Click on check box' }).uncheck();
 expect(page.getByText('Checked')).toBeHidden();
  await page.getByText('Option').nth(i).click();
  const checbox1Status=  await page.getByText('Option').nth(i).isChecked();
   //console.log(checbox1Status);
   expect(checbox1Status).toBe(true);
  await page.getByRole('checkbox', { name: 'Option' }).nth(i).uncheck();
  const checbox1Status1=  await page.getByText('Option').nth(i).isChecked();;
  // console.log(checbox1Status1);
   expect(checbox1Status1).toBe(false);
const disbaledCheckbox = page.getByText('Option').nth(3);
const isDisabled = await disbaledCheckbox.isDisabled();
expect(isDisabled).toBe(true);
  await page.getByRole('button', { name: 'Check All' }).click();
  await expect(page.getByText('Uncheck All')).toBeVisible();
  await page.getByRole('button', { name: 'Uncheck All' }).click();
 await expect(page.getByText('Check All')).toBeVisible();
})

