let Scorestrip = require('./Scorestrip.js')

let currentScorestrip = new Scorestrip().getData();

/*

  The options consist of:

  year: the year of the season (number),
  startWeek: the week number of where to start (number),
  endWeek: the week number of where to end (number)

*/

class Season {
  constructor(options = {}) {
    // If year is not provided as an option, get the current year from current scorestrip
    this.year = options.year != undefined ? options.year : currentScorestrip.y;
    // If the first week of the query is not provided as an option, make it week 1
    this.startWeek = options.startWeek != undefined ? options.startWeek : 1;
    // If the last week of the query is not provided as an option, get the current week from current Scorestrip
    this.endWeek = options.endWeek != undefined ? options.endWeek : currentScorestrip.w;
  }

  multipleYears() {
    return typeof this.year == 'object' && this.year.length > 0 ? true : false;
  }

  getAllEidsFor(team) {
    if (!multipleYears()) {
      
    }
  }
}

module.exports = Season;
