
import { test, expect } from '@playwright/test';

// Тест 1: Амжилттай нэвтрэх
test('Амжилттай нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();

  
  // Системээс гарах цэсийг нээх
  await page.locator('#react-burger-menu-btn').click();

  // Logout элементийг ID-аар олж дарах
  const logoutButton = page.locator('#logout_sidebar_link');

  await expect(logoutButton).toBeVisible();
  await logoutButton.click();

  // Нэвтрэх хуудас руу буцсаныг шалгах
  await expect(page.getByRole('button', { name: 'Login' }))
    .toBeVisible();
});

test('Амжилтгүй нэвтрэх', async ({ page }) => {
  // SauceDemo сайтыг нээх
  await page.goto('https://www.saucedemo.com/');

  // Зөв хэрэглэгчийн нэр, буруу нууц үг оруулах
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  // Нэвтрэх товч дарах
  await page.getByRole('button', { name: 'Login' }).click();

  // Алдааны мэдээлэл гарч ирснийг шалгах
  await expect(
    page.getByText(/Username and password do not match/)
  ).toBeVisible();

  // Нэвтрэх хуудас дээр хэвээр байгааг шалгах
  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});

test('Бараа сагслах', async ({ page }) => {
  // 1. Веб сайт руу орох
  await page.goto('https://www.saucedemo.com/');

  // 2. Системд нэвтрэх
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Нэвтэрсэн эсэхийг шалгах
  await expect(page).toHaveURL(/inventory.html/);

  
  // 4. Sauce Labs Backpack барааг сагслах
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // 5. Сагсанд 1 бараа нэмэгдсэнийг шалгах
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');

  // 6. Сагс руу орох
  await page.locator('.shopping_cart_link').click();

  // 7. Бараа сагсанд байгааг шалгах
  await expect(
    page.getByText('Sauce Labs Backpack')
  ).toBeVisible();

  // 8. Системээс гарах
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  // 9. Нэвтрэх хуудас руу буцсаныг шалгах
  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});
