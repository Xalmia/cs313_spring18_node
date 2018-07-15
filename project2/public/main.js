function displayJournals() {
    url = "/getJournal"; 

    // run an AJAX request for the data in getJournal in index.js
    $.get(url, (result) => {
        if (result != null){
            // populate the main display div with information
            $("#pageTitle").empty();
            $("#pageTitle").append("Journaling Applitcation!!");
            $("#sectionTable").empty();
            $("#sectionTable").append("<table><tr><td><h2>Journals</h2></td><td><h2>Sections</h2></td><td><h2>Pages</h2></td><td><h2>Entries</h2></td></tr>" + 
            "<tr><form><td id='journals'></td><td id='sections'></td><td id='pages'></td><td id='entries'></td></form></tr></table>");
            $("#pageResults").empty();
            for (data in result){
                $("#journals").append("<li class=\'no-dot\'>" + result[data].journal_title + "<button onclick=\'displaySections(" + result[data].journal_id + ")\'><i class=\'right\'</i></button></li>")
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
            for (data in result){
                $("#sections").append("<li class=\'no-dot\'>" + result[data].section_title + "<button onclick=\'displayPages(" + result[data].section_id + ")\'><i class=\'right\'</i></button></li>");
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
            for (data in result){
                $("#pages").append("<li class=\'no-dot\'>" + result[data].page_title + "<button onclick=\'displayEntries(" + result[data].page_id + ")\'><i class=\'right\'</i></button></li>");
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
            for (data in result){
                $("#entries").append("<li class=\'no-dot\'> Entry #" + count++ + "<button onclick=\'loadSelectedPage(" + result[data].text_box_id + ", " + pageId + ")\'><i class=\'right\'</i></button></li>");
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
                $("#pageTitle").empty();
                $("#pageTitle").append("<button onclick='displayJournals()'><i class='left'></i></button>" + result[data].page_title + "<button onclick='saveEntry(" + text_box_id + ")'>Save Entry</button>");
                $("#sectionTable").append("<div id='textBox' class='textBox'> <textarea id='entryText'>" + result[data].text_content +"</textarea></div>");
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