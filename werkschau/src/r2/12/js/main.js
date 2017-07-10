var margin = {top: 20, left: 100, bottom: 30, right: 20};

var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;

var legend = ["Male", "Female", "Undefined"];
var cValue = function (journalist) {
	if (journalist.Sex == "Male") {
		return "blue";
	} else if (journalist.Sex == "Female") {
		return "red";
	} else {
		return "black";
	}
};

var showname = d3.select("body").append("div")
	.attr("class", "showname")
	.style("opacity", 0);

/* INIT */
function init() {
	var jour = "killrate.csv";
	d3.csv(jour, main);
}

function main(data) {
	var countries = [];
	var d = [];

	data.forEach(function (elem) {

		elem.date = new Date(elem.date);

		if (Number.isNaN(elem.date.getTime())) return;

		d.push(elem);

		if (countries.indexOf(elem.Country_killed) < 0)
			countries.push(elem.Country_killed);
	});


	var dateDomain = d3.extent(d, function (d) {
		return d.date
	});

	// X-Axis
	var x = d3.scaleTime()
		.range([0, width])
		.domain(dateDomain);

	// Y-Axis
	var y = d3.scaleBand()
		.range([height, 0])
		.domain(countries.map(function (d) {
			return d;
		}));

	var svg = d3.select('body').append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)


	var container = svg.append('g')
		.attr('transform', 'translate(' + margin.left + "," + margin.top + ")")


	var axis_x = container.append('g')
		.attr("class", "axis_x")
		.attr('transform', 'translate (0, ' + height + ")")
		.call(d3.axisBottom(x));

	var axis_y = container.append('g')
		.attr("class", "axis_y")
		.call(d3.axisLeft(y));

	container.selectAll('dot')
		.data(d)
		.enter().append('circle')
		.attr('class', 'dot')
		.attr('r', 4)
		.style("fill", "red")
		.style("fill", function (journalist) {

			return cValue(journalist);
		})
		.attr('cy', function (d) {
			return y(d.Country_killed);
		})
		.attr('cx', function (d) {
			return x(d.date);
		})

		.on("mouseover", function (d) {
			showname.transition()
				.duration(200)
				.style("opacity", .9);
			showname.html(d["name"] + " - " + d["organization"])
				.style("left", (d3.event.pageY + 5) + "px")
				.style("top", (d3.event.pageX - 20) + "px");
		})
		.on("mouseout", function (d) {
			showname.transition()
				.duration(700)
				.style("opacity", 0);
		});


	svg.selectAll(".legend")
		.data(legend)
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function (d, i) {
			return "translate(0," + i * 30 + ")";
		})
		.append("rect")
		.attr("x", width - 18)
		.attr("width", 30)
		.attr("height", 18)
		.style("fill", function (d) {
			if (d === 'Male') return "blue";
			else if (d === 'Female') return "red";
		})

	svg.selectAll(".legend")
		.data(legend)
		.append("text")
		.attr("x", width - 34)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function (d) {
			return d;
		})
		.style("font-size", 16);
}

window.addEventListener('load', init);
 
