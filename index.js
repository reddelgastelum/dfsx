let Gamecenter = require('./modules/Gamecenter.js');
let Scorestrip = require('./modules/Scorestrip.js');
let getEids = require('./modules/helpers.js').getEids;

class Dfsx {
  constructor(options) {
    this.team = options.team;
    this.weeks = options.weeks;
    this.type = options.type;
    this.opp = options.opp;
  }

  getStats() {
    let ss = new Scorestrip();
    if (this.opp) {
      this.team = ss.getOppOf(this.team);
    }

    let eids = getEids(this.team, this.weeks, '2018');
    let result = {};

    result.att = 0;
    result.cmp = 0;
    result.yds = 0;
    result.tds = 0;
    result.ints = 0;
    result.rec = 0;

    let stats;


    for (let eid of eids) {

      let gc = new Gamecenter({eid, team: this.team, opp: this.opp});

      if (this.type == 'passing') {
        stats = gc.getPassing();
      } else if (this.type == 'rushing') {
        stats = gc.getRushing();
      } else if (this.type == 'receiving') {
        stats = gc.getReceiving();
      }

      if (this.type == 'passing') {
        result.att += stats.att;
        result.cmp += stats.cmp;
        result.yds += stats.yds;
        result.tds += stats.tds;
        result.ints += stats.ints;
      } else if (this.type == 'rushing') {
        result.att += stats.att;
        result.yds += stats.yds;
        result.tds += stats.tds;
      } else if (this.type == 'receiving') {
        result.rec += stats.rec;
        result.yds += stats.yds;
        result.tds += stats.tds;
      }

    }
    if (this.type == 'passing') {
      return {
        att: result.att,
        cmp: result.cmp,
        yds: result.yds,
        tds: result.tds,
        ints: result.ints
      };
    } else if (this.type == 'rushing') {
      return {
        att: result.att,
        yds: result.yds,
        tds: result.tds
      };
    } else if (this.type == 'receiving') {
      return {
        rec: result.rec,
        yds: result.yds,
        tds: result.tds
      }
    }
  }

  getOppDefStats(team) {
    let eids = getEids(this.team, this.weeks, '2018');
  }
}

module.exports = Dfsx;
