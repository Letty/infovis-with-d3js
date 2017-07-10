/*GLOBALS*/
var width = window.innerWidth;
var height = window.innerHeight;

var projection = d3.geoMercator()
	.translate([width / 2, height / 1.5])
	.scale((width - 1) / 2 / Math.PI);


function renderDot(context, x, y, radius, color) {
	return context.append('circle')

		.datum([x, y]) // [longitude, latitude]
		.attr('cx', function (d) {
			return projection([d[0], d[1]])[0];
		})
		.attr('cy', function (d) {
			return projection([d[0], d[1]])[1];
		})
		.attr('r', radius)
		.style('fill', color);
}


function asyncEach(collection, func) {
	for (var i = 0, l = collection.length; i < l; i++)
		(function (element) {
			setTimeout(func.bind(element, element, i, l), 0);
		})(collection[i], i, l);
}


function main() {

	var zoom = d3.zoom()
		.scaleExtent([1, 8])
		.on("zoom", zoomed);

	var path = d3.geoPath()
		.projection(projection);

	var div = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g");
	svg.append("rect")
		.attr("class", "overlay")
		.attr("width", width)
		.attr("height", height)

	var g = svg.append("g");

	svg.call(zoom);

	function renderWorld(error, world) {
		if (error) throw error;

		g.append("g")
			.selectAll("path")
			.data(topojson.feature(world, world.objects.countries).features)
			.enter().append("path")
			.attr("class", function (d) {
				return 'l_' + d.id + 'land'
			})
			.attr("d", path)
			.on('click', function (d) {
			});

		g.append("path")
			.datum(topojson.mesh(world, world.objects.countries, function (a, b) {
				return a !== b;
			}))
			.attr("class", "boundary")
			.attr("d", path)

	}

	function renderLandings(err, landings) {
		if (err) throw err

		asyncEach(landings.slice(0, 3000), function (landing, i, len) {

			var x = parseFloat(landing.reclong);
			var y = parseFloat(landing.reclat);
			var radius = 2;
			var color = 'blue';
			var year = parseInt(landing.year, 10);
			var mass = parseInt(landing.mass, 10);

			if (isNaN(x) || isNaN(y) || isNaN(year) || isNaN(mass)) {
				return;
			}

			if (landing.year < 2000) {
				color = 'red';
			}

			if (mass < 100) {
				radius = 0.5;
			} else if (mass < 200) {
				radius = 0.7;
			} else if (mass < 300) {
				radius = 1.5;
			} else if (mass < 2000) {
				radius = 2.5;
			} else if (mass < 3000) {
				radius = 15;
			} else {
				radius = 6;
			}

			var dot = renderDot(g, x, y, radius, color);
			dot.on('mouseover', function (evt) {
				var label = landing.name + " " + landing.year;

				div.transition().duration(200).style('opacity', 0.9);
				div.html(label)
					.style('left', d3.event.pageX)
					.style('right', d3.event.pageY);
			}).on('mouseout', function (evt) {
				div.transition().duration(500).style('opacity', 0);
			});
		});
	}

	d3.json('world50m.json', renderWorld);
	d3.json('landings_reduced.json', renderLandings);


	function zoomed() {
		g.selectAll('circle')
			.attr('r', function () {
				return 4 / d3.event.transform.k;
			});
		g.attr("transform", d3.event.transform);
	}
}

window.addEventListener('load', main);