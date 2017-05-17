# Swiss Army Knife of Visualization

* Datasets are often raw data and need additional filtering 
* Filtering is one part of the visualization pipeline (Data -> Filtering -> Mapping -> Rendering -> Graphic)
* Row function in `d3.csv(file, row, callback)` is a filtering step that we already used (reducing the dataset and transform strings into numbers)
* but, what if the visualization has classes/clusters/groups based on a dimensions possible (unknown) characteristic values?

## Find all characteristic values inside a dataset

* Skeleton for that problem:
    - one empty object variable (helper) and one empty array for the values (values_array)
    - iterate over the dataset
    - check if the value from the dimension is defined inside the object
    - if not, define it and add (array.push(value)) the value to the array
    - if it's defined, go to the next record in the dataset


```` 
var helper = {};
var values_array = [];

data.forEach(function (d) {
	if (helper[d.dimension] === undefined) {
	helper[d.dimension] = 1;
		values_array.push(d.dimension);
	}
});
````

* with this helper function, counting all elements inside a class, save the minimum and maximum, calculate the median ... is also possible 
* the array can be used for scaling functions (color, bar chart, ordinal scales)

## Use primitives as style elements 

*  the array with values can also be used for styling the background of the visualization
*  f.e. by adding a bar chart in the background
    -  instead of showing bars with a height based on a value, the height of the bars is the height of the svg
    -  the y attribute is 0 (can be left out)
    -  fill the bars based on their index in two colors
* mouse events on the rectangles can be used for additional information about the classes/groups/clusters or draw a detailed visualization somewhere else

## Tooltip with div-Element

* append a div-Element inside the body `<div id="tooltip"></div>`
* set the style for the element for background color, font size ..
* set the visibility and positions attributes in the style
* visibility has to be hidden in the default mode
* use the position absolute property to position the element depending on your mouse

``` 
#tooltip {
			position: absolute;
			visibility: hidden;
			background: white;
			font-size: 12px;
			padding: 5px 15px
		}
```

* select the tooltip element inside the code `var tooltip = d3.select('#tooltip');`

* change the visibility and position in the mouse event

```
tooltip
	.html('tooltip text)
	.style('visibility', 'visible')
	.style("top", (d3.event.pageY - 10) + "px")
	.style("left", (d3.event.pageX + 10) + "px");
```

* change the visibility back to hidden on mouseout

``` 
tooltip.style('visibility', 'hidden');
```


# Links
 
* [Pokemon Dataset on Kaggle](https://www.kaggle.com/abcsds/pokemon)