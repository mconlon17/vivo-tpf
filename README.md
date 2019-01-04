# Experiments with TPF and VIVO

We are developing some JavaScript primitives that use Ajax to make TPF calls to VIVO.  The primitives use the "path" concept from the VIVO Pump -- given a URI, fiollow the path from the uri to the predicate to the object references to their predicates to literals, or deeper.  In this way,
we can bundle up the paths and reduce the complexity to calls that do things like "get all the pubs for this individual"

Using this approach we can demonstrate the production of profiles, visualizations and reports, all written in JavaScript and using just the open public TPF API of VIVO.

# Note 

The TPF features needed are available in OpenVIVO http://openvivo.org.  Anyone can develop software and use the OpenVIVO TPF endpoint.