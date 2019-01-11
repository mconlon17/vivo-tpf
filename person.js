

// Example of using the functions to create a person page from OpenVIVO data

function pageLoadedHandler() {

    // Establish the site and entity
    //
    // Note that a handler could establish multiple site objects and use them in access functions
    // to put things on the screen from multiple sites

    v = vivo.site("http://openvivo.org/tpf/core")
        .entity("http://openvivo.org/a/orcid0000-0002-1304-8447");

    // Call domain specific access functions using the v object to put things on the screen
    // These functions can be in any order -- they are asynchronous and complete independently

    showOrcid(v, "orcidId"); // encapsulate the ontological detail. Retrieve from v, place at id
    showPhoto(v, "photo");
    showResearchAreas(v, "researchAreas");
    showGeographicLocations(v, "geographicLocations");
    showParticipatesInCount(v, "participatesInCount");
    showLabel(v, "label");
    showOverview(v, "overview");
    showFreetextKeywords(v, "freetextKeywords");
    showERACommonsId(v, "eRACommonsId");
    showResearcherId(v, "researcherId");
    showBearerOfCount(v, "bearerOfCount");
    showScopusId(v, "scopusId");
    showRelatedByCount(v, "relatedByCount");
}

window.onload = pageLoadedHandler;
