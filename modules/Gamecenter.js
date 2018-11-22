let request = require('sync-request');

let getEids = require('./helpers').getEids;

class Gamecenter {
  constructor(options) {
    this.eid = options.eid;
    this.team = options.team;
    this.opp = options.opp;
  }

  getBody() {
    let url = 'http://www.nfl.com/liveupdate/game-center/'+ this.eid +'/'+ this.eid +'_gtd.json';
    let response = request('GET', url);
    if (response.statusCode == 200) {
      return JSON.parse(response.getBody());
    } else {
      console.log('There was a problem with the request. Status code: '+ response.statusCode);
    }
  }

  getStats() {
    let game = this.getBody()[this.eid];
    if (this.opp) {
      if (game.home.abbr == this.team) {
        return game.away.stats;
      } else {
        return game.home.stats;
      }
    } else {
      if (game.home.abbr == this.team) {
        return game.home.stats;
      } else {
        return game.away.stats;
      }
    }
  }

  getPassing() {
    let stats = this.getStats()['passing'];
    let playerIds = Object.keys(stats);

    let att = 0;
    let cmp = 0;
    let yds = 0;
    let tds = 0;
    let ints = 0;

    for (let playerId of playerIds) {
      att += stats[playerId].att;
      cmp += stats[playerId].cmp;
      yds += stats[playerId].yds;
      tds += stats[playerId].tds;
      ints += stats[playerId].ints;
    }

    return {
      att,
      cmp,
      yds,
      tds,
      ints
    }
  }

  getRushing() {
    let stats = this.getStats()['rushing'];
    let playerIds = Object.keys(stats);

    let att = 0;
    let yds = 0;
    let tds = 0;

    for (let playerId of playerIds) {
      att += stats[playerId].att;
      yds += stats[playerId].yds;
      tds += stats[playerId].tds;
    }

    return {
      att,
      yds,
      tds
    };
  }

  getReceiving() {
    let stats = this.getStats()['receiving'];
    let playerIds = Object.keys(stats);

    let rec = 0;
    let yds = 0;
    let tds = 0;

    for (let playerId of playerIds) {
      rec += stats[playerId].rec;
      yds += stats[playerId].yds;
      tds += stats[playerId].tds;
    }

    return {
      rec,
      yds,
      tds
    };
  }


}

module.exports = Gamecenter;
