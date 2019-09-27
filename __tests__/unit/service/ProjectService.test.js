import faker from 'faker';
import ProjectService from '../../../src/modules/project/ProjectService';
import { connectMongoDBTest, disconnectMongoDBTest } from '../../tools/dbUtils';
import { generateProject } from '../../tools/mockData';

describe('Test suite for ProjectService', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });
  let project = null;

  it('should insert a Project', async () => {
    project = await ProjectService.insert(generateProject());
    expect(project).not.toBeNull();
    expect(project).not.toBeUndefined();
  });

  it('should find Project by name', async () => {
    const searchProject = await ProjectService.findByName(project.name);

    expect(searchProject.ideas.lenght).toBe(project.ideas.lenght);
    expect(searchProject.name).toBe(project.name);
    expect(searchProject).not.toBeNull();
    expect(searchProject).not.toBeUndefined();
  });

  it('should find Project by id', async () => {
    const searchProject = await ProjectService.findById(project._id);

    expect(searchProject.ideas.length).toBe(project.ideas.length);
    expect(searchProject.name).toBe(project.name);
    expect(searchProject).not.toBeNull();
    expect(searchProject).not.toBeUndefined();
  });

  it('should add a idea in Project', async () => {
    await ProjectService.addIdea(project._id, { title: faker.name.title(), description: faker.lorem.sentence(1) });

    const compareProject = await ProjectService.findById(project._id);

    expect(compareProject.name).toBe(project.name);
    expect(compareProject).not.toBeNull();
    expect(compareProject).not.toBeUndefined();
    expect(compareProject.ideas.length).toBe(project.ideas.length + 1);
  });

  it('should remove a idea in Project', async () => {
    await ProjectService.removeIdea(project._id, project.ideas[0]._id);

    const compareProject = await ProjectService.findById(project._id);

    expect(compareProject.name).toBe(project.name);
    expect(compareProject).not.toBeNull();
    expect(compareProject).not.toBeUndefined();
    expect(compareProject.ideas.length).toBe(project.ideas.length);
  });

  it('should update a idea in Project', async () => {
    const idea = project.ideas[1];

    idea.description = 'TESTEEEEE';

    await ProjectService.addIdea(project._id, idea);

    const compareProject = await ProjectService.findById(project._id);


    const compareIdea = compareProject.ideas.filter((i) => i.description === 'TESTEEEEE');

    expect(compareProject.name).toBe(project.name);
    expect(compareProject).not.toBeNull();
    expect(compareProject).not.toBeUndefined();
    expect(compareIdea.length).toBe(1);
  });
});
