const express = require('express');
const router = express.Router();

router.get('/', (rq, resp)=>{
    resp.render('index', {title: 'My Express App', message:'Hello World from IB'});
})

module.exports=router;