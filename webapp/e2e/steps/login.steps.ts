import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer, {Page, Browser} from "puppeteer";

const feature = loadFeature('./features/login.feature');

let page: Page;
let browser: Browser;

defineFeature(feature, (test) => {
    
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

    test('El usuario introduce incorrectamente sus credenciales', ({given, when, then, and}) => {

        given('el usuario accede a la aplicación', async () => {
            await expect(page.url()).toMatch('http://localhost:3000');
        });

        when('el usuario hace click sobre el botón Comenzar y es redirigido a la página de Inrupt', async () => {
            await expect(page).toClick('button', { text: 'Comenzar' });
            await page.waitForNavigation();
        });

        then('el usuario introduce su usuario y contraseña incorrectamente', async () => {
            await page.type('input#password', '123Ejemplo!');
            await page.click('button');
        });

        and('el usuario visualiza un mensaje de error', async () => {
            const errorMessage = await page.$eval('strong', (el) => el.textContent);
            expect(errorMessage).toMatch('Username required');
        });
    });

    test('El usuario introduce correctamente sus credenciales', ({given, when, then, and}) => {

        given('el usuario accede a la aplicación', async () => {
            await page.goto("http://localhost:3000");
            await page.waitForNavigation();
        });

        when('el usuario hace click sobre el botón Comenzar y es redirigido a la página de Inrupt', async () => {
            await expect(page).toClick('button', { text: 'Comenzar' });
            await page.waitForNavigation();
        });

        then('el usuario introduce su usuario y contraseña correctamente e inicia sesión', async () => {
            await page.type('input#username', 'ejemplo123'); // email = ejemplo123@ejemplo.com
            await page.type('input#password', '123Ejemplo!');
            await page.click('button');
            await page.waitForNavigation();
        });

        and('el usuario puede visualizar su perfil en la app', async () => {
            await page.goto("http://localhost:3000/user");
            await page.waitForNavigation();
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
