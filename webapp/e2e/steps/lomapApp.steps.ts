import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer, {Page, Browser} from "puppeteer";

const feature = loadFeature('./features/lomapApp.feature');

let page: Page;
let browser: Browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({
        headless: false, // false si se quiere ver la ejecución de la prueba
        slowMo: 50 });
    page = await browser.newPage();

    await page.goto("http://localhost:3000", {
        waitUntil: "networkidle0"
      }).catch(() => {});
  });

  test('El usuario accede a la página de inicio', ({given, when, then}) => {

    given('Un acceso a la app por un usuario', () => {
        
    });    

    when('Se encuentra en la página inicial', async () => {
        await expect(page.url()).toMatch('http://localhost:3000');
    });

    then('El usuario visualiza el mensaje de bienvenida', async () => {
        const welcomePage = await page.$eval(".welcome_text", (e) => e.textContent);
        expect(welcomePage).toContain('Bienvenido a LoMap');
    });

  });

  test('El usuario hace click en Solid', ({given, when, then}) => {

    given('Un acceso a la app por un usuario', async () => {
        await page.goto("http://localhost:3000");
    });    

    when('Tras hacer click en el icono de Solid', async () => {
        await expect(page).toClick('a', { class: 'welcome_card' });
    });

    then('El usuario es redirigido a la página de Solid', async () => {
        await page.goto("https://solidproject.org/");
        await expect(page.url()).toMatch('https://solidproject.org/');
    });

  });

  test('El usuario accede a la página de documentación', ({given, when, then}) => {

    given('Un acceso a la app por un usuario', async () => {
        await page.goto("http://localhost:3000");
    });    

    when('Tras hacer click en el botón de la documentación', async () => {
        const docu = await page.$('a[id="nav_docu"]');
        await docu?.click();
    });

    then('El usuario es redirigido a la página de documentación', async () => {
        await page.goto("https://arquisoft.github.io/lomap_es6c/");
        await expect(page.url()).toMatch('https://arquisoft.github.io/lomap_es6c/');
        const docu = await page.$eval("title",  (e) => e.textContent);
        expect(docu).toContain('LOMAP ES6C');
    });

  });

  test('El usuario accede a la página de información', ({given, when, then}) => {

    given('Un acceso a la app por un usuario', async () => {
      await page.goto("http://localhost:3000");
    });    

    when('Tras hacer click en el botón de información', async () => {     
        const info = await page.$('a[id="nav_about"]');
        await info?.click();
    });

    then('El usuario es redirigido a la página de información sobre nosotros', async () => {
        const aboutPage = await page.$eval(".about", (e) => e.textContent);
        expect(aboutPage).toContain('Sobre Nosotros - LoMap_ES6C');
    });

  });

  afterAll(async () => {
    browser.close();
  });

});

function delay(arg0: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, arg0);
  });
}
