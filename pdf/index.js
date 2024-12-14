import express from 'express';
import router from './controller.js';
import cors from 'cors';

const app = express();

app.use(cors());

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(express.json());

app.use('/api/pdf',cors(),  router);

app.listen(3020, () => {
    console.log('pdf service running on port 3020');
})
