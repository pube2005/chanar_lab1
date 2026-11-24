import { test, expect } from '@playwright/test';

// Тест 1: Амжилттай нэвтрэх болон гарах
test('Амжилттай нэвтрэх', async ({ page }) => {

  // Веб сайтыг нээх
  await page.goto('/');

  // Хэрэглэгчийн мэдээлэл оруулах
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Нэвтрэх
  await page.getByRole('button', { name: 'Login' }).click();

  // Амжилттай нэвтэрснийг шалгах
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Цэс нээх
  await page.getByRole('button', {
    name: 'Open Menu'
  }).click();

  // Системээс гарах
  await page.getByRole('button', {
    name: 'Logout',
    exact: true
  }).click();

  // Нэвтрэх хуудас руу буцсаныг шалгах
  await expect(page).toHaveURL(
    'https://www.saucedemo.com/'
  );

  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});
// Тест 2: Амжилтгүй нэвтрэх
test('Амжилтгүй нэвтрэх', async ({ page }) => {

  // Веб сайтыг нээх
  await page.goto('/');

  // Зөв хэрэглэгчийн нэр, буруу нууц үг оруулах
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  // Нэвтрэх товч дарах
  await page.getByRole('button', { name: 'Login' }).click();

  // Алдааны мэдээлэл гарсныг шалгах
  await expect(
    page.getByText(/Username and password do not match/)
  ).toBeVisible();

  // Нэвтрэх хуудсан дээр хэвээр байгааг шалгах
  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});
// Тест 3: Бараа сагслах
test('Бараа сагслах', async ({ page }) => {

  // 1. Веб сайтыг нээх
  await page.goto('/');

  // 2. Системд нэвтрэх
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Амжилттай нэвтэрснийг шалгах
  await expect(page).toHaveURL(/inventory\.html$/);

  // 4. Бараа сонгож сагслах
  const product = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack'
  });

  await product.getByRole('button', {
    name: 'Add to cart'
  }).click();

  // 5. Сагсанд нэг бараа нэмэгдсэнийг шалгах
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');

  // 6. Сагсны хуудас руу орох
  await page.locator('.shopping_cart_link').click();

  // 7. Сагсны хуудас нээгдсэнийг шалгах
  await expect(page).toHaveURL(/cart\.html$/);

  // 8. Сонгосон бараа сагсанд байгааг шалгах
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();
});