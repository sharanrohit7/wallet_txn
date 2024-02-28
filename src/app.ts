import express, { Request, Response, json, response } from 'express';
import Moralis from 'moralis';
import reportRouter from './routes/reports.routes'
import transactionRouter  from "./routes/transactions.routes";
import { checkAPIKey } from './middleware/apiKey.middleware';
const app: express.Application = express();
app.use(express.json())
app.use(checkAPIKey);


app.use("/transaction",transactionRouter)
app.use("/reports",reportRouter)
app.get('/', (req: Request, res: Response) =>{
res.send("Hii")
});
Moralis.start({
    apiKey: process.env.Moralis_API_KEY
});










export default app;