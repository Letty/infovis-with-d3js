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
* a good start for placing elements is the flexbox layout 

```
.container {
    display: flex;
}
```

## Save svg and scaling for later use 

* 

## Drawing functions 

* 

## Uniquie Identifier

* 

## Connect visualizations

*  