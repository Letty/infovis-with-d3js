# Swiss Army Knife of Visualization

* Datasets are often raw data and need additional filtering 
* Filtering is one part of the visualization pipeline (Data -> Filtering -> Mapping -> Rendering -> Graphic)
* Row function in `d3.csv(file, row, callback)` is a filtering step that we already used (reducing the dataset and transform strings into numbers)
* but, what if the visualization have classes based on a dimensions possible (unknown) characteristic values?

## Find all characteristic values inside a dataset

* Skeleton for that problem:
    - one empty object variable (helper) and one emtpy array for the values (values_array)
    - iterate over the dataset
    - check if the value from dimensions is defined inside the object
    - if not, define it and add (array.push(value)) the value to the array
    - if it is defined, go to the next record in the dataset


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

* with this helper function, you can also count all elements inside a class, save the minimum and maximum, calculate the median ...... 

## Use primitives as style elements 

*  
