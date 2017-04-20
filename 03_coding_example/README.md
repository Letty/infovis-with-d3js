# Live Coding Summery
Thanks for all your questions during the live coding session. With this document, i would like to gather all topics that needs further explanation.

## Definitions

* DOM - Document Object Model - HTML document with all tags etc inside [1]

## Selections

* `.select(selector)` - selects on element from DOM
* `.selectAll(selector)`  - selects many elements 
* `selector` - this is a string parameter to specify the object(s) to select. 
    - A selection based on CSS class by using a `.`, one or more elements can be selected
    `d3.selectAll(.rectangle)` will select all elements with the CSS class `rectangle`. The CSS class is either defined inside the HTML tags `<div class='rectangle'>` or with d3js on selected or appended objects `.attr('class', 'rectangle')`
    - A selection based on id by using `#`, elements should have unique id's like serial numbers of notebooks
    `d3.select(#id_1234)` will select the elements with id `id_1234`. The definition is the same like the CSS class example. Inside HTML tags `<div id='id_1234'>` or with d3js on one selected or appended object `.attr('id', 'id_1234')`
    - Another selection is based on HTML tags, one or more elements can be selected
    `d3.selectAll('div')` would select all div elements inside the DOM. In d3js we use HTML tags, when appending new elements f.e. `svg.append('rect')`

Compared to the physical world, imagine our classroom with 9 notebooks. I declare the tag `notebook` as valid HTML for this example. Every notebook is part of a CSS class, based on their operating system, has a unique id and has a name between the tags

```
<notebook class='mac' id='id_0'>Mercury's Notebook</notebook> 
<notebook class='linux' id='id_1'>Venus Notebook</notebook> 
<notebook class='mac' id='id_2'>Earth's Notebook</notebook> 
<notebook class='windows' id='id_3'>Mars Notebook</notebook> 
<notebook class='mac' id='id_4'>Jupiter's Notebook</notebook> 
<notebook class='linux' id='id_5'>Saturn's Notebook</notebook> 
<notebook class='windows' id='id_6'>Uranus Notebook</notebook> 
<notebook class='mac' id='id_7'>Neptune's Notebook</notebook> 
<notebook class='linux' id='id_8'>Pluto's Notebook</notebook> 
```

Lets hava a look on possible selections:

* selecting all notebooks: `d3.selectAll('notebook')` 

output:
```
<notebook class='mac' id='id_0'>Mercury's Notebook</notebook> 
<notebook class='linux' id='id_1'>Venus Notebook</notebook> 
<notebook class='mac' id='id_2'>Earth's Notebook</notebook> 
<notebook class='windows' id='id_3'>Mars Notebook</notebook> 
<notebook class='mac' id='id_4'>Jupiter's Notebook</notebook> 
<notebook class='linux' id='id_5'>Saturn's Notebook</notebook> 
<notebook class='windows' id='id_6'>Uranus Notebook</notebook> 
<notebook class='mac' id='id_7'>Neptune's Notebook</notebook> 
<notebook class='linux' id='id_8'>Pluto's Notebook</notebook> 
```

* selecting all notebooks with Linux operating system `d3.selectAll('.linux')`

output:
```
<notebook class='linux' id='id_1'>Venus Notebook</notebook> 
<notebook class='linux' id='id_5'>Saturn's Notebook</notebook> 
<notebook class='linux' id='id_8'>Pluto's Notebook</notebook> 
```

* select the notebook with id `id_8`, `d3.select('#id_8')`

output:
```
<notebook class='linux' id='id_8'>Pluto's Notebook</notebook> 
```


## Scaling

[1]https://en.wikipedia.org/wiki/Document_Object_Model
