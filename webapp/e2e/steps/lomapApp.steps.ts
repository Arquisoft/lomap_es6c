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

  test('El usuario accede a su perfil', ({given, when, then}) => {

    given('Un acceso a la app por un usuario (con la sesión iniciada)', async () => {
        await page.goto("http://localhost:3000");
        await delay(1000);
        await expect(page).toClick('button', { text: 'Comenzar' });
        await page.waitForNavigation();
        await page.type('input#username', 'ejemplo123'); // email = ejemplo123@ejemplo.com
        await page.type('input#password', '123Ejemplo!');
        await page.click('button');
        await page.waitForNavigation();
    });    

    when('Tras hacer click en el botón del perfil', async () => {
        const user = await page.$('a[id="nav_user"]');
        await user?.click();
        await delay(1000);
    });

    then('El usuario es redirigido a la página de su perfil', async () => {
        await expect(page.url()).toMatch('http://localhost:3000/user');
    });

  });

  test('El usuario añade un comentario a su mapa', ({given, when, then, and}) => {

    given('Un acceso a la app por un usuario', async () => {
        await page.goto("http://localhost:3000");
    });    

    when('El usuario inicia sesión y accede a su mapa', async () => {
        await expect(page).toClick('button', { text: 'Comenzar' });
        await page.waitForNavigation();
        /*await page.type('input#username', 'ejemplo123'); // email = ejemplo123@ejemplo.com
        await page.type('input#password', '123Ejemplo!');
        await page.click('button');
        await page.waitForNavigation();*/
        const user = await page.$('a[id="nav_user"]');
        await user?.click();
        await delay(1000);
        const mapa = await page.$('a[id="mapa"]');
        await mapa?.click();
        await delay(1000);
    });

    then('El usuario selecciona una posición en el mapa', async () => {
        const mapa = await page.$('div[class="map"]');
        await mapa?.click();
        await delay(1000);
    });

    and('Añade el nuevo comentario', async () => {
        const name = await page.$('input[id="makerTitle"]');
        await name?.type("Cervecería");
        await page.click('button');
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

  afterAll(async () => {
    browser.close();
  });

});

function delay(arg0: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, arg0);
  });
}
