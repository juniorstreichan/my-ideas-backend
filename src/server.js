import 'regenerator-runtime/runtime';
import Mongoose from 'mongoose';
import App from './app';

Mongoose.connect(process.env.DATABASE_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

console.log(Mongoose.connection);


App.get('/', (_, res) => res.send({ content: Mongoose.version }));

const port = process.env.PORT || 3334;
App.listen(port);
