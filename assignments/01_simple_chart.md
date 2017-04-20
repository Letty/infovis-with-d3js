# Assignment: Simple Chart
The first assignment is more like another hands on part. You should become a sense for coding visualizations with d3js. That means:

* structure your coding in a logical way
* which parts of the visualization can be proceed before loading the data 
* which parts need the data to be excecuted

There are two different datasets, the first dataset is about the Earth Similarity Index (ESI) for exoplanets [1]. It has one file with more then three dimensions. You can choose two or three dimension to show on one visualisation. You are free to choose but the ESI is of course an important dimension.

The other dataset consists of 30 separate files about the exchange rates of currencies [2]. The base currency is Euro (1 Euro = xx money units in the other currency). Choose one file / currency that you would like to visualize.

For both, keep in mind how you choose a scaling function based on your data dimension (linear, time based, ordinal)[3]
And also what is your geometric primitive (rectangles[4], circles[5], lines[6])


## Criteria to pass the Assignment
* your Visualizations has to work without any errors in the developer console
* choose the right primitives 
* customize your visualization in terms of colors / strokes
* presentation in the course: explain your process, any interesting insights inside the dataset?

## Dates

* Deadline to upload the assignemt in income: 29th April 2017
* Presentation: 3rd May 2017

[1]https://github.com/Letty/infovis-with-d3js/tree/master/assignments/datasets/exoplanets
[2]https://github.com/Letty/infovis-with-d3js/tree/master/assignments/datasets/exchangerates
[3]https://github.com/d3/d3-scale
[4]https://www.w3.org/TR/SVG11/shapes.html#RectElement
[5]https://www.w3.org/TR/SVG11/shapes.html#CircleElement
[6]https://github.com/d3/d3-shape/blob/master/README.md#lines