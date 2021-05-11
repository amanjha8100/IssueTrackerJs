//Selectors


//Event Listeners


//Functions
//to fetch already created issues from strach storage of browser(cookies in  general)
function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById("issuesList");
    //showing issues from local strorage to the application
    issuesList.innerHTML = "";
}