/*
  The Scorestrip class takes an options object. For example

  {
    season: '2018',
    seasonType: 'REG',
    week: '8'
  }

  it returns all the data that scorestrip returns but in json instead of xml

*/

let request = require('sync-request');
let convert = require('xml-js');

class Scorestrip {
  constructor(options = {}) {
    this.season = options.season;
    this.seasonType = options.seasonType;
    this.week = options.week;
  }

  current() {
    if (this.season == undefined || this.seasonType == undefined || this.week == undefined) {
      return true;
    }
    return false;
  }

  getBody() {
    let url;
    if (this.current()) {
      url = 'http://www.nfl.com/liveupdate/scorestrip/ss.xml';
    } else {
      url = 'http://www.nfl.com/ajax/scorestrip?season='+ this.season +'&seasonType='+ this.seasonType +'&week='+ this.week;
    }
    let response = request('GET', url);
    if (response.statusCode == 200) {
      return response.getBody();
    } else {
      console.log('There was a problem with the request. Status code: '+ response.statusCode);
    }
  }

  getData() {
    let body = this.getBody();
    let data = convert.xml2json(body, {compact: true, spaces: 2});
    let json = JSON.parse(data)['ss']['gms'];

    let gd = json['_attributes']['gd'];
    let w = json['_attributes']['w'];
    let y = json['_attributes']['y'];
    let t = json['_attributes']['t'];
    let gmsarr = json['g'];
    let gms = [];

    for (let i = 0; i < gmsarr.length; i++) {
      let game = gmsarr[i]['_attributes'];

      gms.push(game);
    }

    return {
      gd,
      w,
      y,
      t,
      gms
    };

  }

  isDone() {
    let data = this.getData();
    let games = data.gms;
    let results = [];

    for (let i = 0; i < games.length; i++) {
      if (games[i].q == 'F' || games[i].q == 'FO') {
        results.push(true);
      } else {
        break;
      }
    }

    if (games.length == results.length) {
      return true;
    }
    return false;
  }

  getEidFrom(team) {
    let data = this.getData();
    let games = data.gms;
    let result = null;
    for (let i = 0; i < games.length; i++) {

      if ((games[i].h == team || games[i].v == team) && (games[i].q == 'F' || games[i].q == 'FO')) {
        result = games[i].eid;
        break;
      } else {
        result = false;
      }
    }
    return result;
  }
}

module.exports = Scorestrip;
