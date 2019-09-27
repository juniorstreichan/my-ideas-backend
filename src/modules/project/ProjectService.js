import Project from './Project';

class ProjectService {
  async insert(project) {
    if (project && typeof project === 'object') {
      const newProject = await Project.create(project);
      return newProject;
    }
    throw new Error('Project invalid!');
  }

  async findByName(name = '') {
    if (name && name.trim !== '') {
      let project = await Project.findOne({ name });
      if (!project) {
        project = await this.insert({ name, ideas: [] });
      }
      return project;
    }
    throw new Error('Invalid name!');
  }

  async findById(id = '') {
    if (id) {
      const project = await Project.findById(id);
      return project;
    }
    throw new Error('Invalid id!');
  }

  async addIdea(idProject = '', idea) {
    if (idProject && idea) {
      if (idea._id) {
        await Project.update(
          { 'ideas._id': idea._id }, {
            $set: { 'ideas.$': idea },
          },
        );
      } else {
        await Project.update(
          { _id: idProject },
          { $push: { ideas: idea } },
        );
      }
      return;
    }
    throw new Error('Invalid id!');
  }

  async removeIdea(idProject, idIdea) {
    if (idProject && idIdea) {
      await Project.update(
        { _id: idProject },
        { $pull: { ideas: { _id: idIdea } } },
      );
      return;
    }
    throw new Error('Invalid id!');
  }
}

export default new ProjectService();
