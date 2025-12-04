import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
// константы
//const apiUrl = 'https://realworld.qa.guru/';

test('пользователь может зарегистрироваться использую email и пароль ', async ({ request }) => {

    const user = {
        user: {
            username: faker.internet.displayName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
    };
    

    const response = await request.post('https://realworld.qa.guru/api/users', {data: user});
    
    const body = await response.json();
    expect(body.user.token.length).toBeGreaterThan(10);
    expect(body.user.email).toBe(user.user.email);
    expect(body.user.username).toBe(user.user.username);
});
