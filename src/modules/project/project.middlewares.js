import * as yup from 'yup';

const ideaSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
});

const projectSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  ideas: yup.array(ideaSchema),
});

const querySchema = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
});

const addIdeaSchema = yup.object().shape({
  idProject: yup.string().required('ID of Project is required'),
  idea: ideaSchema.required('A new Idea is required'),
});

const removeIdeaSchema = yup.object().shape({
  idProject: yup.string().required('ID of Project is required'),
  idIdea: yup.string().required('ID of Idea is required'),
});

function noBodyRequest(req) {
  return !req.body || Object.keys(req.body).length <= 0;
}

export async function postProjectMiddleware(req, res, next) {
  if (noBodyRequest(req)) {
    return res.status(400).send({ message: 'Invalid Request' });
  }
  try {
    await projectSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}

export async function getProjectMiddleware(req, res, next) {
  try {
    await querySchema.validate(req.query);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}

export async function addIdeaMiddleware(req, res, next) {
  if (noBodyRequest(req)) {
    return res.status(400).send({ message: 'Invalid Request' });
  }
  try {
    await addIdeaSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}

export async function removeIdeaMiddleware(req, res, next) {
  if (noBodyRequest(req)) {
    return res.status(400).send({ message: 'Invalid Request' });
  }
  try {
    await removeIdeaSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}
