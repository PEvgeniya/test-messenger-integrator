import express from 'express';
import path from 'path';
import api from './routes/api.js';


const PORT = process.env.port || 9000;
const app = express ();

app.use('/api', api);
app.use(express.static('../../client/public'));

app.get('*', (req, res) => {
        res.sendFile(path.resolve('../../client/public/index.html')) 
      })

app.listen(PORT, () => {
    console.log(`port - ${PORT}`)
});
