import express from 'express';
import {config} from 'dotenv';
import {mongoClient} from './database/mongo'

const main = async () => {
    const app = express();
    config();
    await mongoClient.connect();

    app.get('/', (req, res) => {
        res.send('Hello World')
    })

    app.listen(process.env.PORT, () => console.log(`server on!!! running on port ${process.env.PORT}`));
}

main();