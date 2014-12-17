var headersInOrder = [
  "","","Children in School", "School Plant", "Expense Per Child",
  "School days per child", "School Year","Attendance",
  "Expenditure and Wealth",  "Daily Cost","High Schools", "Salaries"
];

function determineFillClass(d, i) {
  var cname = "datapoint ";
  switch (d[headersInOrder[i]]) {
    case "0": cname += 'white'; break;
    case "1": cname += 'diagonal-stripe-1'; break;
    case "2": cname += 'diagonal-stripe-4'; break;
    case "3": cname += 'black'; break;
  }
  return cname;
}

d3.csv('rank.csv', function(data) {

  $(function(){

    var base = d3.select("#chart table");
    var headers = base.select("thead");
    var states = base.select("tbody");

    // base containers:
    // - headers
    // - rows per state
    var headerBinding = headers
      .classed("headers", true)
      .append("tr")
        .selectAll("th.header")
        .data(headersInOrder);

    var statesBinding = states.selectAll("tr.state")
      .data(data, function(d) { return d.State; });

    // headers
    var headerEnter = headerBinding.enter();
    headerEnter.append("th")
      .classed("header", true)
      .append("div")
      .text(function(d) { return d.toLowerCase(); });

    // state list
    var statesEnter = statesBinding.enter();

    var stateRow = statesEnter.append("tr")
      .classed("state", true);

    stateRow
      .append("td").attr("class", "rank").text(function(d, i) {
        return i;
      }); // rank
    stateRow.append("td").attr("class", "name").text(function(d, i) {
        return d.State.toLowerCase();
      }); // state name

    stateRow.each(function(d, idx) {
      for(var i = 2; i < headersInOrder.length; i++) {
        d3.select(this).append("td").classed("datapoint", true)
          .append("div")
          .attr("class", function(d) { return determineFillClass(d, i); })
          .html(function(d) {
            return "&nbsp;";
          });
      }
    });

    d3.select('html').attr('class', 'papereffect');
  });

});
