function displayJournals() {
    // run this when the body loads
    var userId = 1;//location.search.split('myParam=')[1]
    url = "/getJournal?id=" + userId; 

    // run an AJAX request for the data in getJournal in index.js
    $.get(url, (result) => {
        if (result != null){
            for (data in result){
                $("#journals").append("<li class=\'no-dot\'>" + result[data].journal_title + "<button onclick=\'displaySections(" + result[data].journal_id + ")\'><i></i></button></li>")
            }
        } else if(result.success == false){
            console.log ("Query failed.");
            $('#journals').empty();
            $("#journals").append("Unable to get journals, Query failure.");
        } else {
            console.log("Error getting section");
            $('#journals').empty();
            $("#journals").append("Unable to get journals")
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
                $("#sections").append("<li class=\'no-dot\'>" + result[data].section_title + "<button onclick=\'displayPages(" + result[data].section_id + ")\'><i></i></button></li>");
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
                $("#pages").append("<li class=\'no-dot\'>" + result[data].page_title + "<button onclick=\'displayEntries(" + result[data].page_id + ")\'><i></i></button></li>");
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
                $("#entries").append("<li class=\'no-dot\'> Entry #" + count++ + "<button onclick=\'loadSelectedPage(" + result[data].text_box_id + ", " + pageId + ")\'><i></i></button></li>");
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
    url = "/getTextData?textBoxId=" + text_box_id/* + "&pageId=" + pageId*/;
    
    $.get(url, (result) => {
        if (result != null){
            $("#sectionTable").empty();
            
            for (data in result){
                //$("#pageTitle").empty();
                //$("#pageTitle").append(result[data].page_title);
                $("#sectionTable").append("<div id='textBox' class='textBox'>" + result[data].text_content +"</div>");
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