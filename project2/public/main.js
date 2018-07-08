function displayJournals() {
    // run this when the body loads
    var userId = 1;//location.search.split('myParam=')[1]
    url = "/getJournal?id=" + userId; 

    // run an AJAX request for the data in getJournal in index.js
    $.get(url, (result) => {
        for (data in result){
            $("#journals").append("<li>" + result[data].journal_title + "</li>")
        }
        console.log(result);
        //$("#journals").append()
    });
    // take the returned JSON object and build a <ul> with each journal as an <li>.
    // place buttons in the <li> that call displaySections(sectionId)
}

function displaySections(journalId) {

}

function displayPages(sectionId) {

}