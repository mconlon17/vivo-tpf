# vivo-tpf

A Javascript experiment to use the TPF API of Vitro to build some access functions that can be used to populate a profile page with data.
In this way, we get a simple HTML page with CSS identified elements, and use the DOM from Javascript to populate identified elements.

If successful, we should be able to build a set of Javascript functions for each of the 56 things that can appear on a profile.  Each
function is a simple combination of four fundamentals -- getObject, getLiteral, loop, and show.  We should also be able to hide the 
ontology access in these functions, allowing full separation of model, function, and display. At least, that's the hope.

*This is early work*

To try it, load the vivo.html into a browser from a directory which has vivo.js available.  The code runs against the open 
TPF API of OpenVIVO.  No authentication is required.  Should display a simple profile.

*Known bugs*

The code needs work around Javascript closures.
