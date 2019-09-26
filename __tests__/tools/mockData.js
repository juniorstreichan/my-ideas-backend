/* eslint-disable import/prefer-default-export */
import faker from 'faker';

export function generateProject() {
  return {
    name: faker.hacker.adjective(),
    ideas: [
      { title: faker.name.title(), description: faker.lorem.sentence(1) },
      { title: faker.name.title(), description: faker.lorem.sentence(1) },
      { title: faker.name.title(), description: faker.lorem.sentence(1) },
      { title: faker.name.title(), description: faker.lorem.sentence(1) },
    ],
  };
}
