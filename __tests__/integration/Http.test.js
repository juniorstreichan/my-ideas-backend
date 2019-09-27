import faker from 'faker';
import httpRequest from 'supertest';
import App from '../../src/app';
import { connectMongoDBTest, disconnectMongoDBTest } from '../tools/dbUtils';
import { generateProject } from '../tools/mockData';


describe('Test suite for http requests', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });
  let project = null;

  it('should POST a Project', async () => {
    const projectMock = generateProject();
    const response = await httpRequest(App).post('/projects').send(projectMock);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toBe(projectMock.name);
    project = response.body;
    expect(response.status).toBe(201);
  });

  it('should return Project by name', async () => {
    const response = await httpRequest(App)
      .get(`/projects?name=${project.name}`).send();

    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);
  });

  it('should return Project by id', async () => {
    const response = await httpRequest(App)
      .get(`/projects?id=${project._id}`).send();

    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);
  });

  it('should add a idea in Project', async () => {
    const updateResponse = await httpRequest(App)
      .put('/projects/ideas/add').send(
        {
          idProject: project._id,
          idea: { title: faker.name.title(), description: faker.lorem.sentence(1) },
        },
      );
    expect(updateResponse.status).toBe(200);

    const response = await httpRequest(App)
      .get(`/projects?id=${project._id}`).send();
    const compareProject = response.body;

    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);

    expect(compareProject.ideas.length).toBe(project.ideas.length + 1);
  });

  it('should update a idea in Project', async () => {
    const idea = project.ideas[1];

    idea.description = 'TESTEEEEE';
    const updateResponse = await httpRequest(App)
      .put('/projects/ideas/add').send(
        {
          idProject: project._id,
          idea,
        },
      );
    expect(updateResponse.status).toBe(200);

    const response = await httpRequest(App)
      .get(`/projects?id=${project._id}`).send();
    const compareProject = response.body;
    const compareIdea = compareProject.ideas.filter((i) => i.description === 'TESTEEEEE');
    expect(compareIdea.length).toBe(1);

    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);

    expect(compareProject.ideas.length).toBe(project.ideas.length + 1);
  });


  it('should remove a idea in Project', async () => {
    const updateResponse = await httpRequest(App)
      .put('/projects/ideas/remove').send(
        {
          idProject: project._id,
          idIdea: project.ideas[0]._id,
        },
      );
    expect(updateResponse.status).toBe(200);

    const response = await httpRequest(App)
      .get(`/projects?id=${project._id}`).send();
    const compareProject = response.body;

    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);

    expect(compareProject.ideas.length).toBe(project.ideas.length);
  });
});
