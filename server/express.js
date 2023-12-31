import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template.js'; 
import productRoutes from './routes/product.route.js';
import categoryRoutes from './routes/category.route.js'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())



app.use('/api',productRoutes);
app.use('/api',categoryRoutes);

app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })

export default app;
