# Event Handling

## Topics

* Legends
* Color Scales
* Events
* Changing styles of elements after event

## Legends

* it shows the color coding or symbol (f.e. a rectangle filled with color) that were used along with the description (text element)
* instead of filling the `.data()` - attribute with the dataset, it will have the color scaling inside
* depending on your whitespace and where the legend should appear, you need to move the group of the legend to a that area 
* similar to the geometric primitives of the visualization, legends are a part of the svg
	- select the non-existing elements
	- move the elements or group to the position
	- bind the color scale
	- append the elements for the legend (rect, text)
	- fill elements with attributes
	
## Color Scales

* using `d3.scaleOrdinal(d3.schemeCategory10)` is the easiest way, if you have some sort of groups inside your data. more categories are available in the [documentation](https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales)
* if you have continuous data, `d3.scaleThreshold()` is your friend
	* the domain can be divided into intervals by hand or
	* by using interval methods like `d3.range(start, stop, step)` where you have the minimum -start-, the maximum -stop- and an optional step value that describes how big a step is (f.e. 0.5, 1, 10, 25 or whatever suits your data)
	* The documentation is available [here](https://github.com/d3/d3-scale/blob/master/README.md#threshold-scales) and a good example how to use it [here](https://bl.ocks.org/mbostock/3306362)

## Events

Selections in d3 can handle events by using `selection.on('typename', listenerfunction)`, see the documentation about possible [event types](https://developer.mozilla.org/en-US/docs/Web/Events)

### Commonly used types
Mouse Events:
* click - click with any button on an element
* mouseover - fires if the mouse enters or is inside an element. That means if your have a big area of an element it fires multiple times.
* mouseout - if the mouse leaves an element

Keyboard Events
* keydown -  any key is pressed
* keyup - any key is released

Window
* resize - listens on your window and fired when the document changed the size. Read the [documentation](https://developer.mozilla.org/en-US/docs/Web/Events/resize#Examples) about that event, its tricky to handle

### Example

#### Mouse click on button

HTML

```
<button id="somebutton">Magic Button</button>
```
JS
```
d3.select('#somebutton', function(){
	// do something after button was clicked
})
```

#### Mouseover for circle SVG element

```
svg.selectAll('.dot')
	.data(data)
	.enter().append('circle')
	.attr('class', 'dot')
	.attr('r', 3)
	.attr('cy', function (d) {	return y(d.SepalWidthCm); })
	.attr('cx', function (d) {	return x(d.SepalLengthCm);	})
	.on('mouseover', function(d){
		// do something on hover
})
```

## Changing elements styles

* change the element, who fires the event, by selecting it inside the mouse over function
* the element is accessible with the keyword `this` inside the function 

``` 
.on('mouseover', function(d){
	d3.select(this)
	.style(....)
})
```

* after your hover, on mouse out, change the element back to the default value
* that means, use the color function based on the data dimension
