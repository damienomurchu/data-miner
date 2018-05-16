const utils = require('./data.js');

// returns a data set to populate a velocity chart
exports.velocity = function (jiraData) {

  let ticketsbySprint = [];

  // guard against missing arguments
  if (!jiraData) {
    let error = {};
    error.error = 'You have not passed in any jira data';
    ticketsbySprint.push(error);
    return ticketsbySprint;
  }

  try {

    const sprintInfo = utils.getSprintInfo(jiraData);

    // get all sprints
    const sprintNames = sprintInfo.map(dtls => {
      return dtls.sprintName;
    });

    sprintNames.forEach(sprintName => {
      const sprintIssues = utils.issuesInSprint(jiraData, sprintName);

      // get sprint dates
      const sprint = sprintInfo.filter(dtl => {
        return dtl.sprintName === sprintName;
      })[0];
      const sprintStart = sprint.startDate;
      const sprintEnd = sprint.endDate;

      // check if tickets resolved within the sprint & return total expected and completed points
      let issues = {};
      issues.sprint = sprintName;
      issues.expected = sprintIssues.map(ticket => {
        return ticket['Story Points'] || 0; // if story points are null
      }).reduce((a, b) => {
        return a + b;
      });
      issues.actual = sprintIssues.map(ticket => {
        // check if resolved, if so return points, otherwise no
        const dateResolved = utils.resolvedDate(ticket);
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
  } catch (err) {
    let error = {};
    error.error = err.message;
    ticketsbySprint.push(error);
    return ticketsbySprint;
  }

};
