import { test, expect } from '@playwright/test';
// константы
const apiUrl = 'https://realworld.qa.guru/';

test('неавторизованный пользователь получает список статей', async ({ request }) => {
    const response = await request.get('https://realworld.qa.guru/api/articles');
    console.log(response.headers());
    console.log(response.body());

    const body = await response.json();
    console.log(body);

    expect(body).toHaveProperty('articlesCount');
    expect(body.articlesCount).toBeGreaterThan(23690);
    expect(response.headers().server).toBe('nginx/1.22.1');
    // expect(response.status()).toBe(200);

 //   expect(response.headers().key).toBe('value');
 //   expect(await response.json().articlesCount).toBeGreaterThan(23590);
});
