import express from 'express';
import { connectDB } from './config/database';
import surveyRoutes from './routes/surveyRoutes';

const app = express();

connectDB();

app.use(express.json());

app.use('/api', surveyRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
