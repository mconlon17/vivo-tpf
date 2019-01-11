# vivo-tpf

A Javascript experiment to use the TPF API of Vitro to build some access functions that can be used to populate 
an HTML page with data. That is, we get a simple HTML page with identified elements, and use the 
DOM from Javascript to populate identified elements.

If successful, we should be able to build a set of Javascript functions for each of the 56 things that can appear 
on a person profile.  Each function is a simple combination of fundamentals -- getObject, getLiteral, loop, filter, and 
show.  We should also be able to hide the ontology access in these functions, allowing full separation of model, 
function, and display. At least, that's the hope.

The design also allows for retrieval from multiple TPF endpoints to a single HTML page.  We can use this to 
gather data from various sites, rather than duplicating data in every site.

*This is early work*

To try it, load the person.html into a browser from a directory which has the other files available.  The code runs 
against the open TPF API of OpenVIVO.  No authentication is required.  Should display a simple profile.

*Known bugs*

The code needs work around Javascript closures, and additional access functions.
