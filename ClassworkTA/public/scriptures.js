function getScripture(){
    var book = document.getElementById("book").value;
    
    url = "/scriptures?book=" + book;

    callAjax(url, (result) =>{
        console.log("Back from AJAX with result: ", result);
    })
}

function callAjax(url, callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}