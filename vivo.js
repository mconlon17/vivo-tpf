// To do:
// -- add isolator functions to loop -- looks like we are getting bleed through of predicates
// -- handle photos
// -- handle links -- things like web sites and entity references that should be links
// -- handle complex entities like pubs, positions, education -- these involve filtering and
// -- switching the entity.  May need an insert to add elements to DOM for complex entities

function extractLiterals(data, s, p) { // create an object array of Literals from the TPF return
    var re = new RegExp("<"+ s +"> <" + p + "> \"(.*?)\"", "g");
    return data.match(re).map(function(txt) {return txt.match(/\"(.*?)\"/)[1]});
};

function extractObjects(data, s, p) { // create an object array of Object references from the TPF return
    var re = new RegExp("<"+ s +"> <" + p + "> <.*?>", "g");
    return data.match(re).map(function(txt) {return txt.match(/<.*?> <.*?> <(.*?)>/)[1]});
};

vivo = {
    site: "",
    predicateUri: "",
    subjectUri: "",
    entity: function(entityUri){ // set the entity for which data will be returned
        this.subjectUri = entityUri; // set the subject to the entity to start.  loop will alter
        return this;
    },
    site: function(siteUrl){ // set the URL for the TPF endpoint for the site
        this.site = siteUrl;
        return this;
    },
    show: function(data, id, multiple){ // put data values into the DOM at the id.  Multiple true for concatenation
        var docElement = document.getElementById(id);
        console.log("In show: " + typeof data + data);
        if (multiple && data.length > 1) {
            docElement.innerHTML = data.join(", ");
        } else if (multiple && data.length == 1 && docElement.innerHTML.length > 0) {
            docElement.innerHTML = docElement.innerHTML + ', ' + data[0];
        } else {
            docElement.innerHTML = data[0];
        }
        return this;
    },
    get: function(predicateUri, g, f){  // get triples for the current subject, this predicate, all objects
        this.predicateUri = predicateUri;
        var hPredicateUri = this.predicateUri;
        var hSiteUri = this.site;
        if (typeof hSubjectUri == 'undefined') {
            hSubjectUri = this.subjectUri;
        }

        function makeSuccessFunction(s, p){
             return function(data) {
                return f(data, s, p);
                }
        };

        var successFunction = makeSuccessFunction(hSubjectUri, hPredicateUri);

        function makeDataFilterFunction(s, p){
             return function(data) {
                return g(data, s, p);
                }
        };

        var dataFilterFunction = makeDataFilterFunction(hSubjectUri, hPredicateUri);

        $.ajax({
            headers: {Accept : "application/n-triples; charset=utf-8"},
            url: hSiteUri,
            data: {subject: hSubjectUri, predicate: hPredicateUri, object: "", page: "1"},
            dataFilter: function(data) { return dataFilterFunction(data);},
            success: function(data) { successFunction(data); }
            });
        return this;
    },
    getLiterals: function(p, f) { return vivo.get(p, extractLiterals, f); },
    getObjects: function(p, f) { return vivo.get(p, extractObjects, f); },
    filter: function(data, f){ // filter the object array, to do
        f(data);
        return this;
    },
    loop: function(data, f) { // loop over the object array, each object becomes a new subject
        hPredicateUri = this.predicateUri;

    //  a function here to encapsulate predicate?  Predicate is changing through independent asynchronous
    //  processes

        for (var i = 0; i < data.length; i++){
            (function(i){
                hSubjectUri = data[i];

                //  and another function here to encapsulate subject? No problems so far with subject, but
                //  additional asynchronous code could possibly cause changes in hSubjectUri

                console.log("In loop", hSubjectUri, hPredicateUri);
                f(data);
                })(i);
        }
        return this;
    }
}

function pageLoadedHandler() {

    v = vivo.site("http://openvivo.org/tpf/core")
        .entity("http://openvivo.org/a/orcid0000-0002-1304-8447")
        .getLiterals("http://www.w3.org/2000/01/rdf-schema#label",
            function(data) { vivo.show(data, "label", false); })
        .getLiterals("http://vivoweb.org/ontology/core#overview",
            function(data) { vivo.show(data, "overview", false); })
        .getLiterals("http://vivoweb.org/ontology/core#freetextKeyword",
            function(data) { vivo.show(data, "freetextKeywords", true); })
        .getLiterals("http://vivoweb.org/ontology/core#eRACommonsId",
            function(data) { vivo.show(data, "eRACommonsId", true); })
        .getLiterals("http://vivoweb.org/ontology/core#researcherId",
            function(data) { vivo.show(data, "researcherId", true); })
        .getLiterals("http://vivoweb.org/ontology/core#scopusId",
            function(data) { vivo.show(data, "scopusId", true); })
//        .getObjects("http://vitro.mannlib.cornell.edu/ns/vitro/public#mainImage",
//            function(data) {
//                vivo.loop(data,
//                    function(data){
//                        vivo.getLiterals("http://vitro.mannlib.cornell.edu/ns/vitro/public#downloadLoction",
//                            function(data) {
//                                vivo.show(data, "photo", false);
//                            })
//                    })
//            })
        .getObjects("http://vivoweb.org/ontology/core#hasResearchArea",
            function(data) {
                vivo.loop(data,
                    function(data){
                        vivo.getLiterals("http://www.w3.org/2000/01/rdf-schema#label",
                            function(data) {
                                vivo.show(data, "researchAreas", true);
                            })
                    })
            })
        .getObjects("http://purl.obolibrary.org/obo/RO_0001025",
            function(data) {
                vivo.loop(data,
                    function(data){
                        vivo.getLiterals("http://www.w3.org/2000/01/rdf-schema#label",
                            function(data) {
                                vivo.show(data, "geographicLocations", false);
                            })
                    })
            });
}

window.onload = pageLoadedHandler;
