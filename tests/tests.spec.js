const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('localhost:5501');
});

test('add one item, confirm it has been created', async ({ page }) => {
  const todoItem = page.locator("#todo-input");

  await todoItem.fill("Dammsuga");
  await todoItem.press("Enter");
  await expect(page.getByText("Dammsuga")).toBeVisible();
});

test('add one item, confirm "1 item left", check the item and confirm "0 items left"', async ({ page }) => {
  const todoItem = page.locator("#todo-input");
  const itemCount = page.locator("#item-count");

  await todoItem.fill("Träna");
  await todoItem.press("Enter");

  //Check if itemCount === "1 item left"
  await expect(itemCount).toHaveText("1 item left");

  //Complete task and check if itemCount === "0 items left"
  await page.locator(".checkbox").click();
  await expect(itemCount).toHaveText("0 items left");
});

test('add 3 items, check one item and confirm "2 items left"', async ({ page }) => {
  const todoItem = page.locator("#todo-input");
  const itemCount = page.locator("#item-count");

  await todoItem.fill("Dammsuga");
  await todoItem.press("Enter");

  await todoItem.fill("Träna");
  await todoItem.press("Enter");

  await todoItem.fill("Äta");
  await todoItem.press("Enter");

  //Complete one task and check if itemCount === "2 items left"
  await page.locator(".checkbox").first().click();
  await expect(itemCount).toHaveText("2 items left");
});


