import { Router } from 'express';
import {
 addIdeaMiddleware, getProjectMiddleware, postProjectMiddleware, removeIdeaMiddleware 
} from './project.middlewares';
import ProjectController from './ProjectController';


const projectRoutes = Router();

projectRoutes.endpointBase = '/projects';

projectRoutes.post('/', postProjectMiddleware, ProjectController.post);
projectRoutes.get('/', getProjectMiddleware, ProjectController.get);
projectRoutes.put('/ideas/add', addIdeaMiddleware, ProjectController.addIdea);
projectRoutes.put('/ideas/remove', removeIdeaMiddleware, ProjectController.removeIdea);


export default projectRoutes;
