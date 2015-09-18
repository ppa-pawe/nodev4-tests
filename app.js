/**
 * Created by ppa on 17.09.2015.
 */

var chalk = require('chalk');

run();

function run(){
    "use strict";

    console.log('*'.repeat(100));

    var person = {
        get name(){
            return 'Nicholas';
        },
        sayName(){
            console.log(this.name);
        }
    };

    console.log(person.name);

    console.log(createPerson('test', 30).age);

    console.log('*'.repeat(100));
    console.log(chalk.green('hello'));
}

function createPerson(name, age){
    "use strict";
    return {
        name,
        age
    };
}
