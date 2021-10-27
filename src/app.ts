import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

// Middleware
import share from './share';

const app = express();

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Logging
app.use(
	morgan(
		':date[web] :method :remote-addr :url :status :response-time ms - :res[content-length]',
	),
);

// Middle
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/:domain', share);

app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err);
	res.send(err);
});

export = app;