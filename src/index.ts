import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './routes/users';
import dataRouter from './routes/data';
import mongoose from 'mongoose';
const morgan=require('morgan');
const logger = morgan('tiny');

const app: express.Application = express();
mongoose.connect('mongodb+srv://nasser007:nasser007@cluster0.hrdjhpq.mongodb.net/?retryWrites=true&w=majority').then(res=>console.log('connected to mongodb !'))
// mongoose.connect('mongodb://localhost/datadb').then(res=>console.log('connected to mongodb !'))

app.use(logger);
app.use(bodyParser.json())

app.use('/users', userRouter)
app.use('/data', dataRouter)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = Error('not found');
  next(error)
})

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(3000)
