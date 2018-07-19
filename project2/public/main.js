function displayJournals() {
    url = "/getJournal"; 

    // run an AJAX request for the data in getJournal in index.js
    $.get(url, (result) => {
        if (result != null){
            // populate the main display div with information
            $("#appTitle").empty();
            $("#saveResults").empty();
            $("#appTitle").append("Journaling Applitcation!!");
            $("#sectionTable").empty();
            $("#sectionTable").append("<table><tr><td><h2 id='journalTitle'>Journals<button onclick='addJournalInput()' class='btn btn-info btn-sm' data-toggle='modal' data-target='#myModal'><i class='icono-plus black'></i></button></h2></td>" +
            "<td><h2 id='sectionTitle'>Sections</h2></td><td><h2 id='pageTitle'>Pages</h2></td><td><h2 id='entryTitle'>Entries</h2></td></tr>" + 
            "<tr><form><td id='journals'></td><td id='sections'></td><td id='pages'></td><td id='entries'></td></form></tr></table>");
            $("#pageResults").empty();
            for (data in result){
                $("#journals").append("<li class=\'no-dot\'><button class='btn btn-info btn-sm black' onclick='deleteJournal(" + result[data].journal_id + ")'> - </button>" + result[data].journal_title + "<button class='btn btn-info btn-sm' " + 
                "onclick=\'displaySections(" + result[data].journal_id + ")\'><i class=\'right arrow\'</i></button></li>")
            }
        } else if(result.success == false){
            console.log ("Query failed.");
            $('#sectionTable').empty();
            $("#sectionTable").append("Unable to get journals, Query failure.");
        } else {
            console.log("Error getting section");
            $('#sectionTable').empty();
            $("#sectionTable").append("Unable to get journals")
        }
    });
    // take the returned JSON object and build a <ul> with each journal as an <li>.
    // place buttons in the <li> that call displaySections(sectionId)
}

function displaySections(journalId) {
    url = "/getSection?journalId=" + journalId;

    $.get(url, (result) => {
        if (result != null){
            $("#sections").empty();
            $("#sectionTitle").append("<button class='btn btn-info btn-sm'><i class='icono-plus black'></i></button>")
                for (data in result){
                $("#sections").append("<li class=\'no-dot\'><button class='btn btn-info btn-sm black' onclick='deleteSection(" + result[data].section_id + ")'> - </button>" + result[data].section_title + "<button class='btn btn-info btn-sm'" + 
                "onclick=\'displayPages(" + result[data].section_id + ")\'><i class=\'right arrow\'</i></button></li>");
            }
        } else if(result.success == false){
            console.log ("Query failed.");
            $('#sections').empty();
            $("#sections").append("Unable to get sections, Query failure.");
        } else {
            console.log("Error getting section");
            $('#sections').empty();
            $("#sections").append("Unable to get sections");
        }});
        
}

function displayPages(sectionId) {
    url = "/getPage?sectionId=" + sectionId;

    $.get(url, (result) => {
        if (result != null){
            $("#pages").empty();
            $("#pageTitle").append("<button class='btn btn-info btn-sm'><i class='icono-plus black'></i></button>")
                for (data in result){
                $("#pages").append("<li class=\'no-dot\'>" + result[data].page_title + "<button class='btn btn-info btn-sm'" + 
                "onclick=\'displayEntries(" + result[data].page_id + ")\'><i class=\'right arrow\'</i></button></li>");
            }
        } else if(result.success == false){
            console.log ("Query failed.");
            $('#pages').empty();
            $("#pages").append("Unable to get pages, Query failure.");
        } else {
            console.log("Error getting page");
            $('#pages').empty();
            $("#pages").append("Unable to get pages")
        }
    });
}

function displayEntries(pageId){
    url = "/getEntries?pageId=" + pageId;

    $.get(url, (result) => {
        if (result != null){
            $("#entries").empty();
            var count = 1;
            $("#entryTitle").append("<button class='btn btn-info btn-sm' data-toggle='modal' data-target='#myModal'><i class='icono-plus black'></i></button>")
            for (data in result){
                $("#entries").append("<li class=\'no-dot\'> Entry #" + count++ + "<button class='btn btn-info btn-sm' " + 
                "onclick=\'loadSelectedPage(" + result[data].text_box_id + ", " + pageId + ")\'><i class=\'right arrow\'</i></button></li>");
            }
        } else if(result.success == false){
            console.log ("Query failed.");
            $('#entries').empty();
            $("#entries").append("Unable to get entries, Query failure.");
        } else {
            console.log("Error getting page");
            $('#entries').empty();
            $("#entries").append("Unable to get entries")
        }
    });
}

function loadSelectedPage(text_box_id, pageId) {
    url = "/getTextData?textBoxId=" + text_box_id + "&pageId=" + pageId;
    
    $.get(url, (result) => {
        if (result != null){
            $("#sectionTable").empty();
            
            for (data in result){
                $("#appTitle").empty();
                $("#appTitle").append("<button class='btn btn-info btn-sm' onclick='displayJournals()'><i class='left arrow'></i></button>" 
                + result[data].page_title + "<button class='btn btn-info btn-sm' onclick='saveEntry(" + text_box_id + ")'>Save Entry</button>");
                $("#sectionTable").append("<div id='textBox' class='textBox'> <textarea id='entryText' rows='7' cols='100'>" + result[data].text_content +"</textarea></div>");
            }
        } else if(result.success == false){
            console.log ("Query failed.");
            $('#entries').empty();
            $("#entries").append("Unable to get entry text, Query failure.");
        } else {
            console.log("Error getting page");
            $('#entries').empty();
            $("#entries").append("Unable to get entry text")
        }
    });
}

function saveEntry(boxId) {
    var url = "/postEntry";
    var textBox = document.getElementById("entryText").value;
    // should probably add some field validation here in case of null fields.
    $.post(url, {textBoxId: boxId, textValue: textBox}).done((result) => {
        console.log(result);
        if (result.success == true){
            $("#saveResults").empty();
            $("#saveResults").append("Save successful");
        } else {
            $("#saveResults").empty();
            $("#saveResult").append("Save Failed!");

        }
    });
}

/*
    FUNCTIONS FOR INPUT FIELD GENERATION SCRIPTS
*/
function addJournalInput() {
    //generate a bootstrap input object
    $("#journals").append("<div class='input-group mb-3'>" + 
    "<input type='text' class='form-control' placeholder='Journal Title' id='newJournalTitle' aria-label='New Journal' aria-describedby='basic-addon2'>" +
    "<div class='input-group-append'><button onclick='addJournal()' class='btn btn-outline-secondary' type='button'>Button</button></div></div>")
}

function addSectionInput(journalId) {
    //generate a bootstrap input object
}

function addPageInput() {
    //generate a bootstrap input object
}

function addEntryInput() {
    //generate a bootstrap input object
}

/*
    FUNCTIONS FOR STARTING POST REQUESTS
*/

function addJournal() {
    url = '/postNewJournal';
    var journalTitle = document.getElementById("newJournalTitle").value;

    $.post(url, {journalTitle: journalTitle}, (err, result) => {
        if (err == null) {

        } else {
            // query succeeded, redisplay the field.
            displayJournals();
        }
    });
}

function addSection(journalId) {
    url = '/postNewSection';
    $.post(url, {journalId: journalId}, (err, result) => {
        if (err) {

        } else {
            // query succeeded, redisplay the field.
            
            displaySections(journalId);
        }
    });
}

function addPage() {
    url = '/postNewPage';
    $.post(url, (err, result) => {

    });
}

function addEntry() {
    url = '/postNewEntry';
    $.post(url, (err, result) => {

    });
}

function deleteJournal(journalId) {
    url = '/deleteJournal'

    $.ajax({
        url: url,
        type: 'DELETE',
        data: {journalId: journalId},
        success: (result) => {
            if (result.success){
                displayJournals();
            } else if (resilt.data == "cascade") {
                $('#saveResults').empty();
                $('#saveResults').append("Error, Journal still has sections.");
            }
        }
    });
}