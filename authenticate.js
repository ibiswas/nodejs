function authenticate( req, resp, next){

    console.log('Authenticating...');
    next();

}

module.exports = authenticate;

//Factory Func

function createCircle( radius){
    return {
        radius,
        draw() {
            console.log('Draw');
        }
    };
}

const circle = createCircle(1);

//Constructor Function

function Circle( radius){

    this.radius = radius;
    this.draw = function(){
        console.log( 'Draw');
    }
}

const circle2 = new Circle(2);
