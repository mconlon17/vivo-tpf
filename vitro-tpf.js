// TPF functions to work with Vitro and VIVO
//
// To do:
//
// -- refactor name of loop to foreach
// -- use modern Javascript (see Wikidata) do not use Jquery
// -- preserve context through depth.  Entity -> object -> object -> Literal.  Access functions need
//    access to this context and know how to retrieve from it
// -- handle links -- things like web sites and entity references that should be links
// -- handle paging -- current queries limited to 100 rows in result sets
// -- handle complex entities such as pubs, positions, education -- these involve filtering and
//    switching the entity.  May need an insert to add elements to DOM for complex entities

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
    objectUri: "",
    entity: function(entityUri){ // set the entity for which data will be returned
        this.subjectUri = entityUri; // set the subject to the entity to start.  loop will alter
        return this;
    },
    site: function(siteUrl){ // set the URL for the TPF endpoint for the site
        this.site = siteUrl;
        return this;
    },
    show: function(data, id){ // put a single data value into the DOM at the id
        var docElement = document.getElementById(id);
        console.log("In show: " + typeof data + data);
        docElement.innerHTML = data[0];
        return this;
    },
    showMultiple: function(data, id){  // put comma separated data values into the DOM at the id
        var docElement = document.getElementById(id);
        console.log("In showMultiple: " + typeof data + data);
        if (data.length > 1 && docElement.innerHTML.length > 0 ) {
            docElement.innerHTML = docElement.innerHTML + ', ' + data.join(", ");
        }
        else if (data.length > 1 && docElement.innerHTML.length == 0) {
            docElement.innerHTML = data.join(", ");
        }
        else if (data.length == 1 && docElement.innerHTML.length > 0 ) {
            docElement.innerHTML = docElement.innerHTML + ', ' + data[0];
        }
        else {
            docElement.innerHTML = data[0];
        }
    },
    showImg: function(data, id){ // put the data in the img src tag
        var docElement = document.getElementById(id);
        docElement.src = data[0];
        console.log("In showImg. src = " + data[0]);
        return this;
    },
    showCount: function(data, id){ // put the count (length) of the data into the DOM at the id
        var docElement = document.getElementById(id);
        docElement.innerHTML = data.length;
        console.log("In showCount. n = " + data.length);
        return this;
    },
    get: function(predicateUri, g, f){  // get triples for the current subject, this predicate, all objects
        this.predicateUri = predicateUri;
        var hPredicateUri = this.predicateUri;
        var hSiteUri = this.site;
        if (typeof hSubjectUri == 'undefined') {
            hSubjectUri = this.subjectUri;
        }
        var hObjectUri = this.objectUri;

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
            data: {subject: hSubjectUri, predicate: hPredicateUri, object: hObjectUri, page: "1"},
            dataFilter: function(data) { return dataFilterFunction(data);},
            success: function(data) { successFunction(data); }
            });
        return this;
    },
    getLiterals: function(p, f) { return vivo.get(p, extractLiterals, f); },
    getObjects: function(p, f) { return vivo.get(p, extractObjects, f); },
    filter: function(data, o, f){ // filter the data for type o, call f
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