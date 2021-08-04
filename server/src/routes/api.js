import express from 'express';
import useragent from 'express-useragent';

const router = express.Router();

router.use(useragent.express());


router.get('/cat', (req, res) => {
    console.log(req);
    res.send('<h2>Meow</h2>')
});

router.get('/whoami', (req, res) => {
    const userAgent = req.useragent;
    console.log(userAgent);
    try { 
        if (userAgent.os.includes('Windows')) {
            res.send('Windows')
        }
        if (userAgent.os.includes('OS')) {
            res.send('Mac');
        }
        if (userAgent.os.includes('Linux')) {
            res.send('Linux');
        }
       
    } catch(err) {
        res.send(err.message)
    }

    
})

export default router; 