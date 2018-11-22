let Dfsx = require('./index.js');
let Scorestrip = require('./modules/Scorestrip.js');
let Gamecenter = require('./modules/Gamecenter.js');
let Season = require('./modules/Season.js');

// let gc = new Gamecenter({eid: '2012020500'});
// let data = gc.getStats({team: 'GB', opp: false});

let s = new Season({year: 2018});

console.log(s);
