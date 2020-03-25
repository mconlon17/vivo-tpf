

// Example of using the functions to create a person page from OpenVIVO data

function pageLoadedHandler() {

    // Establish the site and entity.  Here we use a wildcard entity to get site stats

    v = vivo.site("http://openvivo.org/tpf/core")
        .entity("");

    // Call domain specific access functions using the v object to put things on the screen
    // These functions can be in any order -- they are asynchronous and complete independently

    showPersonCount(v, "people");
    showOrganizationCount(v, "organizations");
    showEventCount(v, "events");
    showPublicationCount(v, "publications");
    showLocationCount(v, "locations");
}

window.onload = pageLoadedHandler;
