
import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import authRoutes from './api/routes/auth.routes';
import cookieParser from 'cookie-parser';
import projectRoutes from './api/routes/project.routes';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req: Request, res: Response)=>{
    // throw new Error('Test error handling');
    res.send('Hello flowdesk project')
})

app.use(globalErrorHandler);
export default app;