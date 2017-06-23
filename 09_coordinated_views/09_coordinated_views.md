# Coordinated Views

## Resources

* [Crossfilter Example](http://square.github.io/crossfilter/)
* [Scatterplot Matrix with Brushing](https://bl.ocks.org/mbostock/4063663)
* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Intro - What are coordinated views?

* more then one visualization of the same or multiple datasets
* visualizations can interact with each other 
    - highlight the same data records inside all visualizations
    - select one record / element inside a visualization and redraw another visualization based on the selection 

## HTML skeleton and CSS properties

* Placing visualization inside div elements instead of just appending svg's in the body tag
* div elements can hold other html elements like svg's

```
<div class="container">
    <div>
        <div>Headline Viz 1</div>
        <div id="viz1"></div>
    </div>
    <div>
        <div>Headline Viz 2</div>
        <div id="viz2"></div>
    </div>
</div>
```

* use css property `display` to arrange the div elements
* a good start for placing elements is the `flexbox` layout 

```
.container {
    display: flex;
}
```

## Save svg and scaling for later use 

* save the svg's for all visualizations, where a redraw has to be done, in variables
* maybe the dimensions of the visualizations are not the same. width, height and margins has to be stored also
* as usual save the scaling and axis in variables 
* when redraw a viz, the variables will be used
* this is similar to the update procedure in visualization (see lecture 08)

## Unique Identifier

* find one dimension or a combination of dimensions, which describe one data record uniquely
* this could be an id, a name or a combination of date and name
* use this identifier for a unique `id` and/or in the `class` of the element
* this is similar to the example: show meteor who landed in the same year or show journalists who worked for the same medium and where killed
* with this method it is possible to select on record in all visualizations

## Connect visualizations

*  