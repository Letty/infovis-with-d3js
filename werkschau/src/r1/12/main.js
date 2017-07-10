/* GLOBALS */
var margin = { top: 20, left: 40, bottom:30, right: 20};
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;


function init (){
  // CSV files 
  var brl = "exchange-BRL.csv";
  var chf = "exchange-CHF.csv";


  d3.csv(brl, main); 
};

/* MAIN */
function main (d){
  

    d.forEach(function(d) { 
    d.date = new Date(d.date);  
    d.rates = +(d.rates);       
  });

  // Domain of date [min, max]
  var dateDomain = d3.extent(d, function(d){return d.date });
  // Domain of Rates [min, mix]
  var ratesDomain = d3.extent(d, function(d){ return d.rates});

  // X-Axis
  var x = d3.scaleTime()                        
    .range([ 0, width ] )
    .domain (dateDomain);
  // Y-Axis
  var y = d3.scaleLinear()
    .range([ height, 0])  
    .domain (ratesDomain);

// Build CSV Element on Page.Body
var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  
// Build CSV Elecment Layer1
var container = svg.append('g')
  .attr('transform', 'translate(' + margin.left + "," + margin.top + ")")

// Format X-Axis
var axis_x = container.append('g')
  .attr("class","axis_x")
  .attr('transform', 'translate (0, ' + height + ")")
  .call(d3.axisBottom(x));
// Format Y-Axis
var axis_y = container.append('g')
  .attr("class","axis_y")
  .call(d3.axisLeft(y));

// Draw Dot relevant to Data
container.selectAll('dot')
  .data(d)
  .enter().append('circle')
  .attr('class', 'dot')
  .attr('r', 5)
  .attr('cy', function (d) { return y(d.rates);})   
  .attr('cx', function (d) { return x(d.date);});
};

// Add Init Function Event 'onload'
window.addEventListener('load', init );






   
