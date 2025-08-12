import { faker } from '@faker-js/faker';

export function generateMockPets(amount = 50) {
    const pets = [];
    for (let i = 0; i < amount; i++) {
        pets.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.animal.cat(),
            species: faker.animal.type(),
            age: faker.number.int({ min: 1, max: 15 }),
            owner: null
        });
    }
    return pets;
}