const express = require( 'express');
const router = express.Router();

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
];

router.get('/', (req, resp)=>{
    resp.send(courses);
})

router.get('/:id', (req, resp)=>{


    const course = courses.find( c=>c.id === parseInt(req.params.id));
    if(!course){
        resp.status(404).send('No Course found');
    }else resp.send( course);
})

router.post('/', (req, resp)=>{

    const {error} = validate( req.body);

    if( error){
        resp.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push( course);
    resp.send(course);
})

router.put('/:id', (req, resp)=>{

    const course = courses.find( c=>c.id === parseInt( req.params.id));
    if( !course){
        resp.status(404).send("No Course Found");
        return;
    }

    const {error} = validate( req.body);
    if( error){
        resp.status(400).send( error);
        return;
    }

    course.name = req.body.name;
    resp.send(course);
    resp.end();
})

router.delete('/:id', (req, resp)=>{

    const course = courses.find( c=>c.id === parseInt( req.params.id));
    if( !course){
        resp.status(404).send("No Course Found");
        return;
    }

    courses.splice( courses.indexOf(course), 1);

    resp.send(course);
    resp.end();
})

function validate( course){

    console.log( 'In Validate course = ' + course.name);
    const schema =  { 
        name: Joi.string().min(3).required()

    };
    return Joi.validate( course, schema);
}

module.exports=router;