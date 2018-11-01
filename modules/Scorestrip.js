let request = require('sync-request');

class Scorestrip {
  constructor(season, seasonType, week) {
    this.season = season;
    this.seasonType = seasonType;
    this.week = week;
  }

  getBody() {
    let url = 'http://www.nfl.com/ajax/scorestrip?season='+ this.season +'&seasonType='+ this.seasonType +'&week='+ this.week;
    let response = request('GET', url);
    if (response.statusCode == 200) {
      return response.getBody();
    } else {
      console.log('There was a problem with the request. Status code: '+ response.statusCode);
    }
  }

  getJson() {
    let body = this.getBody();
  }
}

module.exports = Scorestrip;
