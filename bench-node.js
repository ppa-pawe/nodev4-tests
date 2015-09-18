/**
 * Created by ppa on 17.09.2015.
 */
var benchrest = require('bench-rest');

// OR more powerfully define an array of REST operations with substitution
// This does a unique PUT and then a GET for each iteration
var flow = {
    main: [
        { post: 'http://localhost:3002/user', json: {name: "TestUser",gender: "Male",age: 30} }
    ]
};

// There are even more flow options like setup and teardown, see detailed usage

var runOptions = {
    limit: 10,     // concurrent connections
    iterations: 10000  // number of iterations to perform
};
benchrest(flow, runOptions)
    .on('error', function (err, ctxName) { console.error('Failed in %s with err: ', ctxName, err); })
    .on('end', function (stats, errorCount) {
        console.log('error count: ', errorCount);
        console.log('stats', stats);
    });