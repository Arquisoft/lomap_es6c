import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer, {Page, Browser} from "puppeteer";

const feature = loadFeature('./features/initial.feature');

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

  test('El usuario accede a la página de bienvenida', ({given, when, then}) => {

    given('Un acceso a la app por un usuario', () => {

    });    

    when('Tras hacer click en el botón Inicio', async () => {
      await expect(page).toClick('a', { text: 'Inicio' });
    });

    then('El usuario es redirigido a la página de bienvenida', async () => {
      const welcomePage = await page.$eval(".welcome_text", (e) => e.textContent);
      expect(welcomePage).toContain('Bienvenido a LoMap');
    });

  });

  test('El usuario accede a la página sobre nosotros', ({given, when, then}) => {

    given('Un acceso a la app por un usuario', async () => {
      await page.goto("http://localhost:3000/start");
    });    

    when('Tras hacer click en el botón Sobre Nosotros', async () => {
      await expect(page).toClick('a', { text: 'Sobre Nosotros' });
    });

    then('El usuario es redirigido a la página sobre nosotros', async () => {
      const aboutPage = await page.$eval(".about", (e) => e.textContent);
      expect(aboutPage).toContain('Sobre Nosotros - LoMap_ES6C');
    });

  });

  test('El usuario accede a la página de inicio de sesión desde Comenzar', ({given, when, then}) => {

    given('Un acceso a la página de bienvenida de la app por un usuario', async () => {
      await page.goto("http://localhost:3000/start");
    });    

    when('Tras hacer click en el botón Comenzar', async () => {
      await expect(page).toClick('a', { text: 'Comenzar' });
    });

    then('El usuario es redirigido a la página de inicio de sesión', async () => {
      const loginPage = await page.$eval(".login", (e) => e.textContent);
      expect(loginPage).toContain('Log in');
    });

  });

  test('El usuario accede a la página de inicio de sesión', ({given, when, then}) => {

    given('Un acceso a la app por un usuario', async () => {
      await page.goto("http://localhost:3000");
    });    

    when('Tras hacer click en el botón Profile', async () => {
      await expect(page).toClick('a', { text: 'Profile' });
    });

    then('El usuario es redirigido a la página de inicio de sesión', async () => {
      const loginPage = await page.$eval(".login", (e) => e.textContent);
      expect(loginPage).toContain('Log in');
    });

  });

  test('El usuario accede a la página de Solid', ({given, when, then}) => {

    given('Un acceso a la página de bienvenida de la app por un usuario', async () => {
      await page.goto("http://localhost:3000/start");
    });    

    when('Tras hacer click en el icono de Solid', async () => {      
      await expect(page).toClick('a', { class: 'welcome_card' });
    });

    then('El usuario es redirigido a la página de Solid', async () => {
      // page.url() === "http://localhost:3000/start"
      await page.goto("https://solidproject.org/");
      await expect(page.url()).toMatch('https://solidproject.org/');
    });

  });

  test('El usuario accede a la página de documentación', ({given, when, then}) => {

    given('Un acceso a la app por un usuario', async () => {
      await page.goto("http://localhost:3000");
    });    

    when('Tras hacer click en el botón Documentación', async () => {
      await expect(page).toClick('a', { text: 'Documentación' });
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