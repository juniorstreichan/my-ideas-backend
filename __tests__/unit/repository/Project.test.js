import faker from 'faker';
import { connectMongoDBTest, disconnectMongoDBTest } from '../../tools/dbUtils';
import Project from '../../../src/modules/project/repository/Project';
import { generateProject } from '../../tools/mockData';


describe('Test suite for Project CRUD', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });

  let project = null;

  it('should create a new Project', async () => {
    project = await Project.create(generateProject());

    expect(project).not.toBeNull();
  });

  it('should update a Project', async () => {
    const newProject = generateProject();

    await Project.findByIdAndUpdate(project._id, newProject);

    project = await Project.findById(project._id);

    expect(project).not.toBeNull();
    expect(project.name).toEqual(newProject.name);
    expect(project.description).toEqual(newProject.description);
  });

  it('should delete a Project', async () => {
    await Project.findByIdAndDelete(project._id);
    const deleteProject = await Project.findById(project._id);
    expect(deleteProject).toBeNull();
  });

  it('should find by Project name', async () => {
    project = await Project.create(generateProject());

    const projectFind = await Project.findOne({ name: project.name });
    expect(projectFind).not.toBeNull();
  });

  it('should add a idea in Project', async () => {
    await Project.update(
      { _id: project._id },
      { $push: { ideas: { title: faker.name.title(), description: faker.lorem.sentence(1) } } },
    );

    project = await Project.findById(project._id);

    expect(project).not.toBeNull();

    expect(project.ideas.length).toBe(5);
  });

  it('should remove a idea in Project', async () => {
    await Project.update(
      { _id: project._id },
      { $pull: { ideas: project.ideas[0] } },
    );

    project = await Project.findById(project._id);

    expect(project).not.toBeNull();

    expect(project.ideas.length).toBe(4);
  });
});
