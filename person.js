

// Example of using the functions to create a person page from OpenVIVO data

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
        .getObjects("http://vitro.mannlib.cornell.edu/ns/vitro/public#mainImage",
            function(data) {
                vivo.loop(data,
                    function(data){
                        vivo.getObjects("http://vitro.mannlib.cornell.edu/ns/vitro/public#downloadLocation",
                            function(data) {
                                vivo.showImg(data, "photo");
                            })
                    })
            })
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
            })
        .getObjects("http://purl.obolibrary.org/obo/RO_0000056",
            function(data) {
                vivo.showCount(data, "participatesInCount", false);
            })
        .getObjects("http://purl.obolibrary.org/obo/RO_0000053",
            function(data) {
                vivo.showCount(data, "bearerOfCount", false);
            })
        .getObjects("http://vivoweb.org/ontology/core#relatedBy",
            function(data) {
                vivo.showCount(data, "relatedByCount", false);
            });
}

window.onload = pageLoadedHandler;
