// ESM
import { faker } from '@faker-js/faker';


export function createRandomUser() {
    return {
        username: faker.person.fullName(),
        // email: faker.email.email(),
        firstName: faker.person.firstName(),
        role: faker.datatype.number(1),
        // lastName: faker.person.lastName(),
        birthDate: faker.date.past(20, new Date(2000, 0, 1)).toISOString().split('T')[0],
        gender: faker.datatype.number(1),
    };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
    count: 20,
});