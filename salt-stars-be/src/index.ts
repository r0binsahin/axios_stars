import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { getMessage } from './message-utils';
import starWarsRouter from './api/v1/star-wars';
import cors from 'cors';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send(getMessage());
});

app.use('/api/v1/star-wars', starWarsRouter);

app.listen(port, () => {
  console.log(`Server is running 🚀 at http://localhost:${port}\n'Cmd + click' the link above ☝️ to open it in the browser.`);
});