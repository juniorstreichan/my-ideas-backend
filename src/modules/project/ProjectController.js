import ProjectService from './ProjectService';

class ProjectController {
  async post(req, res) {
    try {
      const project = await ProjectService.insert(req.body);

      return res.status(201).send(project);
    } catch (error) {
      return res.status(error.status || 400).send({ message: error.message });
    }
  }

  async get(req, res) {
    try {
      const { id, name } = req.query;


      if (id) {
        const project = await ProjectService.findById(id);
        return res.status(200).send(project);
      }

      if (name) {
        const project = await ProjectService.findByName(name);
        return res.status(200).send(project);
      }


      return res.status(404).send({ message: 'Not found' });
    } catch (error) {
      return res.status(error.status || 400).send({ message: error.message });
    }
  }

  async addIdea(req, res) {
    try {
      const { idProject, idea } = req.body;

      if (idProject && idea) {
        await ProjectService.addIdea(idProject, idea);
        return res.sendStatus(200);
      }

      return res.status(404).send({ message: 'Not found' });
    } catch (error) {
      return res.status(error.status || 400).send({ message: error.message });
    }
  }

  async removeIdea(req, res) {
    try {
      const { idProject, idIdea } = req.body;

      if (idProject && idIdea) {
        await ProjectService.removeIdea(idProject, idIdea);
        return res.sendStatus(200);
      }

      return res.status(404).send({ message: 'Not found' });
    } catch (error) {
      return res.status(error.status || 400).send({ message: error.message });
    }
  }
}

export default new ProjectController();
