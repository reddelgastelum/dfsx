let Scorestrip = require('./modules/Scorestrip.js');

function getEids(team, weeks, season) {
  let eids = [];
  let ss = null;
  let currentWeek = 99;

  while (eids.length < weeks && currentWeek > 0) {

    if (currentWeek == 99) {
      ss = new Scorestrip();
    } else {
      ss = new Scorestrip({season: season, seasonType: 'REG', week: currentWeek})
    }

    currentWeek = Number(ss.getData().w);
    let eid = ss.getEidFrom(team);

    if (eid) {
      eids.push(eid);
      currentWeek = currentWeek - 1;
    } else {
      currentWeek = currentWeek - 1;
    }
  }

  return eids;
}

console.log(getEids('GB', 16, '2018'));
