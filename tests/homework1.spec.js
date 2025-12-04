import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const apiUrl = 'https://apichallenges.herokuapp.com';
let token;
let createId;

test.describe.serial("Challenge", () => {
    test.beforeAll (async ({ request }) => {
        //получаем токен
        const response = await request.post(`${apiUrl}/challenger`);
        const headers = response.headers();
        token = headers['x-challenger'];
        console.log(`https://apichallenges.herokuapp.com/gui/challenges/${token}`);
    });

    test('Получение списка всех челленджей', async({request}) => {
        const response = await request.get(`${apiUrl}/challenges`, {
           headers:{
             'x-challenger': token
        }
    });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.challenges.length).toBe(59);
    });

    test('Получение списка всех задач', async({request}) => {
        const response = await request.get(`${apiUrl}/todos`, {
           headers:{
             'x-challenger': token
        }
    });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.todos.length).toBeGreaterThan(1);
    });

    test('Получение 404 ошибки запрос в несуществующий метод', async({request}) => {
        const response = await request.get(`${apiUrl}/todo`, {
           headers:{
             'x-challenger': token
        }
    });
        expect(response.status()).toBe(404);
    });

    test('Создание таски ', async({request}) => {
        const reqData = {
            title: 'create test task',
            doneStatus: false,
            description: ''
        }
        const response = await request.post(`${apiUrl}/todos`, {
           headers:{
             'x-challenger': token
       }, 
         data: reqData
    });
        const body = await response.json();
        createId = body.id;
        expect(response.status()).toBe(201);
        expect(body.title).toBe('create test task');
    });

    test('Получение созданой таски по id', async({request}) => {
        const response = await request.get(`${apiUrl}/todos/${createId}`, {
           headers:{
             'x-challenger': token
       } 
    });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.todos[0].title).toBe('create test task');
        expect(body.todos[0].doneStatus).toBe(false);
        expect(body.todos[0].description).toBe('');
    });

    test('Редактирование созданой таски full', async({request}) => {

        const reqData = {
            title: 'update test task',
            doneStatus: true,
            description: 'done'
        }
        const response = await request.put(`${apiUrl}/todos/${createId}`, {
           headers:{
             'x-challenger': token
       }, 
         data: reqData
    });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.title).toBe('update test task');
        expect(body.doneStatus).toBe(true);
        expect(body.description).toBe('done');
    });

    test('Удаление созданой таски ', async({request}) => {
        const response = await request.delete(`${apiUrl}/todos/${createId}`, {
           headers:{
             'x-challenger': token
       }
    });
        expect(response.status()).toBe(200);
    });

    })
