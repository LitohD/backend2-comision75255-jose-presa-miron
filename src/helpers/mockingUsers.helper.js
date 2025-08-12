import { faker } from '@faker-js/faker';
import { createHash } from './hash.helper.js';

export function generateMockUsers(amount = 50) {
    const users = [];
    for (let i = 0; i < amount; i++) {
        users.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: createHash('coder123'),
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: [],
            avatar: faker.image.avatar(),
            city: faker.location.city(),
            date: faker.date.birthdate(),
        });
    }
    return users;
}