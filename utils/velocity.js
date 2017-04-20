const utils = require('../utils/data.js');

// returns a data set to populate a velocity chart
exports.velocity = function() {

  // get all sprints
  var sprintNames = utils.getSprintInfo().map(dtls => {
    return dtls.sprintName;
  });

  var ticketsbySprint = [];
  sprintNames.forEach(sprintName => {
    var sprintIssues = utils.issuesInSprint(sprintName);

    // get sprint dates
    var sprint = utils.getSprintInfo().filter(dtl => {
      return dtl.sprintName === sprintName;
    })[0];
    var sprintStart = sprint.startDate;
    var sprintEnd = sprint.endDate;

    // check if tickets resolved within the sprint & return total expected and completed points
    var issues = {};
    issues.sprint = sprintName;
    issues.expected = sprintIssues.map(ticket => {
      return ticket['Story Points'] || 0; // if story points are null
    }).reduce((a, b) => {
      return a + b;
    });
    issues.actual = sprintIssues.map(ticket => {
      // check if resolved, if so return points, otherwise no
      var dateResolved = utils.resolvedDate(ticket);
      if ((dateResolved) && (dateResolved >= sprintStart) && (dateResolved <= sprintEnd))
        return ticket['Story Points'] || 0;
      return 0;
    }).reduce((a, b) => {
      return a + b;
    });

    ticketsbySprint.push(issues);
  });

  // sort results by sprint name
  return ticketsbySprint.sort((a, b) => {
    return a.sprint > b.sprint;
  });

}

console.log(this.velocity());
