window.onload = function() {

  var journalistsData;

  var marginViz1 = {
    top: 5,
    left: 100,
    bottom: 70,
    right: 10
  };

  var marginViz2 = {
    top: 5,
    left: 100,
    bottom: 20,
    right: 10
  };

  var window_width = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

  var window_height = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight

  var width = window_width * 0.98 - marginViz1.left - marginViz1.right;
  var height = (window_height / 1.9) * 0.97 - marginViz1.top - marginViz1.bottom;

  var tooltip = d3.select('#tooltip');
  var selectionName = d3.select('#selection');

  var removeSelection = d3.select('#remove-selection')
    .on('click', function() {
      selectionName.html('worldwide');
      d3.select(this).style('visibility', 'hidden');
      updateCountryViz(journalistsData);
    });

  ///////////////////////////////////////

  var svg_viz_1 = d3.select('#viz_1')
    .append('svg')
    .attr('width', width + marginViz1.left + marginViz1.right)
    .attr('height', height + marginViz1.top + marginViz1.bottom)
    .append('g')
    .attr('transform', 'translate(' + marginViz1.left + ',' + marginViz1.top + ')');

  var x = d3.scaleTime()
    .range([0, width]);

  var y = d3.scaleBand()
    .range([height, 0]);

  var r = d3.scaleLinear()
    .range([1, 10]);

  var yAxis = d3.axisLeft(y);
  var xAxis = d3.axisBottom(x);

  ///////////////////////////////////////

  var svg_viz_2 = d3.select('#viz_2')
    .append('svg')
    .attr('width', width + marginViz2.left + marginViz2.right) // original: widthSp
    .attr('height', height + marginViz2.top + marginViz2.bottom);

  var g = svg_viz_2.append('g')
    .attr('transform', 'translate(' + marginViz2.left + ',' + marginViz2.top + ')');

  var gy = g.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);

  var gx = g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  ///////////////////////////////////////

  var helper = {};
  var countries = [];
  var media = [];

  d3.csv('data/journalists_kills.csv',

    function(error, data) {

      data.forEach((d) => d.date = new Date(d.date)); // string to date

      journalistsData = data;
      journalistsData.forEach(function(d) {

        if (helper[d.country_killed] === undefined) {
          countries.push(d.country_killed);
          helper[d.country_killed] = {
            count: 0
          };
        }
        helper[d.country_killed].count++;

        if (helper[d.country_killed][d.medium] === undefined) {
          media.push(d.medium);
          helper[d.country_killed][d.medium] = {
            count: 0
          };
        }
        helper[d.country_killed][d.medium].count++;
      });

      countries.sort();
      media.sort();

      var matrix = [];
      var max = -1e10; // What is max for?

      for (var key in helper) {
        for (var k in helper[key]) {
          if (k !== 'count') {
            matrix.push({
              country_killed: key,
              medium: k,
              count: helper[key][k].count
            });
            if (max < helper[key][k].count) {
              max = helper[key][k].count;
            }
          }
        }
      }

      drawBarchart(matrix, helper, countries, svg_viz_1);
      updateCountryViz(journalistsData);
    });

  function drawBarchart(data, helper, countries, svg) {

    var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(countries.map((d) => d));

    var y = d3.scalePow().exponent(0.5)
      .rangeRound([height, 0])
      .domain([0, 180]);

    var color = d3.scaleLinear()
      // .domain([1, 3, 6, 8, 12, 25, 35, 45])
      .domain([0, 30, 180])
      // .range(d3.schemeOrRd[9]);
      .range(['#fee8c8', '#fdbb84', '#e34a33']);

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.append('g') // axis bottom text rotate
      .attr('class', 'x-matrix')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => y(helper[d.country_killed].count))
      .attr('x', (d) => x(d.country_killed) + x.bandwidth() * 0.5)
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(helper[d.country_killed].count))
      .style('fill', (d) => color(helper[d.country_killed].count))

      .on('mouseenter', function(d) {
        svg.select('.' + d.country_killed)
          .style('visibility', 'visible');
      })

      .on('mouseout', function(d) {
        svg.select('.' + d.country_killed)
          .style('visibility', 'hidden');
      })

      .on('click', function(d) {
        var reduced = reduceData(journalistsData, d.country_killed);
        selectionName.html('in ' + d.country_killed);
        removeSelection.style('visibility', 'visible');
        updateCountryViz(reduced);
      });
  }

  function updateCountryViz(data) {

    x.domain([d3.min(data, (d) => d.date * 0.99), d3.max(data, (d) => d.date * 1.01)]);

    y.domain(media.map((d) => d));

    gy.transition()
      .duration(1500)
      .call(yAxis);

    gx.transition()
      .duration(1500)
      .call(xAxis);

    var dots = g.selectAll('.dot')
      .data(data);

    dots.exit().remove();

    dots.enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('class', function(d) {
        return 'dot ' + d.country_killed;
      })
      .style('fill', function(d) {
        if (d.sex === 'male') {
          return '#5DA392'; // POLISHED PINE
        } else if (d.sex === 'female') {
          return '#E5C669'; // HANSA YELLOW
        }
      })
      .style('opacity', 0.5)
      .merge(dots)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)

      .transition()
      .duration(1500)
      .attr('r', 4)
      .attr('cy', (d) => y(d.medium))
      .attr('cx', (d) => x(d.date));

    function mouseover(d) {
      tooltip
        .html('Name: ' + d.name + '<br>' +
          'Sex: ' + d.sex + '<br>' +
          'Country killed: ' + d.country_killed + '<br>' +
          d.local_foreign + '<br>' +
          'Medium: ' + d.medium + '<br>'
        )
        .style('visibility', 'visible')
        .style('visibility', 'visible')
        .style('top', (d3.event.pageY - 10) + 'px')
        .style('left', (d3.event.pageX + 10) + 'px');
    }

    function mouseout(d) {
      tooltip.style('visibility', 'hidden');
    }
  }

  function reduceData(data, country) {
    var array = [];

    data.forEach(function(d) {
      if (d.country_killed === country) {
        array.push(d);
      }
    });

    return array;
  }
};
