# Data love
## Basics of data structures
two possible structures

* Arrays `['Apple', 'Banana', 'Cars']`
* Objects `{name: 'Apple', categorie: 'Fruit'}`

you can also combine them

* Array of Objects: `[{name: 'Apple', categorie: 'Fruit'}, {name: 'Banana', categorie: 'Fruit'}, {name: 'Car', categorie: 'Vehicle'}]`
* Array with Array(s): `[ [1,1], [1,2], [2,1], [2,2] ]`
* Objects with Arrays: `{name: 'Apple', keywords: ['Fruit', 'Healthy', 'Sweet']}`
* Objects with Subobjects: `{name: 'Apple tree', contains: {trunk: 1, branch: 20, leafs: 500}}`


the difference is how you access the items of the structure

* Arrays via indices : `a[x][y][z]...`
* Objects via keys: `object.name, object[name]`

another difference is, how you iterate over the structure

* Arrays with loops like: for, forEach
* Objects with a loop over the keys: for(key in object)

Now we know how data is represented in JavaScript, lets use data frome files!

## tsv (tab-separated-values) / csv (comma-separated-values)

Example Data:
```
Id,SepalLengthCm,SepalWidthCm,PetalLengthCm,PetalWidthCm,Species
1,5.1,3.5,1.4,0.2,Iris-setosa
2,4.9,3.0,1.4,0.2,Iris-setosa
3,4.7,3.2,1.3,0.2,Iris-setosa
```

`d3.csv(url, row, callback)`

formatting the dataset via row
```
d3.csv('file.csv', 
function (d){
    return {
        id: +d.id,
        sepalLengthCm: +d.SepalLengthCm,
        sepalWidthCm: +d.SepalWidthCm
    }
}
function(error, data){
    //the data just lives here..
    // this is a asynchronus function, if you need the data outside, make sure 
    // the data is really loaded and use async-library
})
```

you can reduce the dataset to the subset you will need for your visualization
but if you need all dimension, you have to declare all dimension!


formating datset in the callback function,
data is an array of objects

```
d3.csv('file.csv', function(error, data){
    data.forEach(function(d){
        d.Id = +d.Id;
        d.PetalLengthCm = +d.PetalLengthCm;
        d.PetalWidthCm = +d.PetalWidthCm;
        d.SepalLengthCm = +d.SepalLengthCm;
        d.SepalWidthCm = +d.SepalWidthCm;
    });
})
```
you just need to format the dimension that are not correct, for example strings into arrays

or if you need to format a string or number into a date, you can use this:
`d.date = new Date(+d.Year, 0, 1)`

## json - JavaScript Object Notation
```
d3.json('filename', function(error, data){
    //the data just lives here..
    // this is a asynchronus function, if you need the data outside, make sure 
    // the data is really loaded and use async
})
```

## Control Flows
### Conditions
* if-else
```
    if(i === 3){
        //do something if the condition is true
    }else{
        //do something if its not true
    }
```

* switch
```
    switch(i){
        case 1:
            console.log('i: '+i):
            break;
        case 2:
            console.log('i: '+i):
            break;
        default: 
            console.log('i: '+i);
    }
```

### Loops

* for
```
    for(var i = 0; i < 10, i++){
        console.log('i: '+i+' ' + i*i);
    }
```
* forEach
```
    var array = [1,2,3,4,5,6,7,8,9,10];

    array.forEach(function(d){
        console.log('d: '+d+' - '+ (d*d));
    });
```

Other loops  
* while
```
    var i = 0;
    while(i<10){
        console.log('i: '+i+' - '+ (i*i));
        i++;
    }
```

* doWhile
```
        var i = 0;
        do{
            console.log('i: '+i+' - '+ (i*i));
            i++;
        }while(i<10)
```

## Functions
```
function name(parameters){
    //stuff goes here
    // optional return value
    return something; 
}
```

## You learned today
* loading external datasets
* loops to iterate over data
* conditions inside your code
* how functions work

## References
* [d3.request to load datasets](https://github.com/d3/d3-request)
* [Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* [Comparison Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators?v=test)
* [Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
* [Iris Dataset on Kaggle](https://www.kaggle.com/uciml/iris)