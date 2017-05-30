# Maps

## Resources

* [World Maps - Topojson](https://unpkg.com/world-atlas@1.1.4/world/)
* [Command-line-cartography by Mike Bostock](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c)
* [Natural Earth - Mapdata](http://www.naturalearthdata.com/downloads/)
* [Open Data - Bundesamt für Kartografie und Geodäsie](http://www.geodatenzentrum.de/geodaten/gdz_rahmen.gdz_div?gdz_spr=deu&gdz_akt_zeile=5&gdz_anz_zeile=0&gdz_unt_zeile=0&gdz_user_id=0)
* [Video - Why all maps are wrong](https://www.youtube.com/watch?v=kIID5FDi2JQ)

* [TopoJson Documentation](https://github.com/topojson/topojson)
* [Projection Documentation](https://github.com/d3/d3-geo)

## Intro - TopoJson

* [TopoJson Schema](https://en.wikipedia.org/wiki/GeoJSON#TopoJSON)
* transform object - translate and scaling parameter
* objects - with coordinates or arcs to draw lines, polygons or points and additional information inside the properties (f.e. names, iso codes ..)
* arcs - nested array with coordinates to draw

## Geographic Functions for Maps

* Projection 
    * mapping the 3d model of the earth into 2d 
    * like finding the best representation where distortion bothers you not too much
    * define: translate, center point of the projection, and the scale of the map
* Path
    * `d3.geoPath()` for drawing country lines and boarders
    * add the projection to the path for correct mapping

