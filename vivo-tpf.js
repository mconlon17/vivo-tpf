//  Access functions for VIVO
//
//  All ontological knowledge is encapsulated here
//  Designers us access functions to put data on pages using id tags in their pages
//
//  Each page has a window.onload handler to call the required access functions for the page.  See
//  person.js for a page loader for the person.html page

function showOrcid(s, id){
    s.getObjects("http://vivoweb.org/ontology/core#orcidId",
        function(data) { s.show(data, id); })
}

function showPhoto(s, id){
    s.getObjects("http://vitro.mannlib.cornell.edu/ns/vitro/public#mainImage",
        function(data) {
            s.loop(data,
                function(data){
                    s.getObjects("http://vitro.mannlib.cornell.edu/ns/vitro/public#downloadLocation",
                        function(data) {
                            s.showImg(data, id);
                        })
                })
        })
}

function showResearchAreas(s, id) {
    s.getObjects("http://vivoweb.org/ontology/core#hasResearchArea",
        function(data) {
            s.loop(data,
                function(data){
                    s.getLiterals("http://www.w3.org/2000/01/rdf-schema#label",
                        function(data) {
                            s.showMultiple(data, id);
                        })
                })
        })
}

function showGeographicLocations(s, id) {
    s.getObjects("http://purl.obolibrary.org/obo/RO_0001025",
        function(data) {
            s.loop(data,
                function(data){
                    s.getLiterals("http://www.w3.org/2000/01/rdf-schema#label",
                        function(data) {
                            s.showMultiple(data, id);
                        })
                })
        })
}


function showLabel(s, id) {
    s.getLiterals("http://www.w3.org/2000/01/rdf-schema#label",
        function(data) {
            s.show(data, id);
        })
}

function showOverview(s, id) {
    s.getLiterals("http://vivoweb.org/ontology/core#overview",
        function(data) {
            s.show(data, id);
        })
}

function showFreetextKeywords(s, id) {
    s.getLiterals("http://vivoweb.org/ontology/core#freetextKeyword",
        function(data) {
            s.showMultiple(data, id);
        })
}

function showERACommonsId(s, id) {
    s.getLiterals("http://vivoweb.org/ontology/core#eRACommonsId",
        function(data) {
            s.show(data, id);
        })
}

function showResearcherId(s, id) {
    s.getLiterals("http://vivoweb.org/ontology/core#researcherId",
        function(data) {
            s.show(data, id);
        })
}

function showScopusId(s, id) {
    s.getLiterals("http://vivoweb.org/ontology/core#scopusId",
        function(data) {
            s.show(data, id);
        })
}

function showParticipatesInCount(s, id) {  // probably not interesting.  Want domain entities like degrees held
    s.getObjects("http://purl.obolibrary.org/obo/RO_0000056",
        function(data) {
            s.showCount(data, id);
        })
}

function showBearerOfCount(s, id) {
    s.getObjects("http://purl.obolibrary.org/obo/RO_0000053",
        function(data) {
            s.showCount(data, id);
        })
}

function showRelatedByCount(s, id) {
    s.getObjects("http://vivoweb.org/ontology/core#relatedBy",
        function(data) {
            s.showCount(data, id);
        })
}