//Selectors
const form = document.getElementById("issueInputForm");
//Event Listeners
form.addEventListener("submit",saveIssue);

//Functions
function saveIssue(e){
    let issueDesc = document.getElementById("issueDescInput").value;
    let issueSeverity = document.getElementById("issueSeverityInput").value;
    let issueAssignedTo = document.getElementById("issueAssignedToInput").value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus,
    }
    //entering object into local storage
    if(localStorage.getItem('issues') == null){
        let issues = [];
        issues.push(issue);
        //json stringify, convert into json and save to local storage
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    else{
        //Json parse retrieve info from local storage in json format
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        //convert to json and send to local storage
        localStorage.setItem('issues',JSON.stringify(issues));
    }

    form.reset();
    fetchIssues();
    e.preventDefault();
}

function setStatusClosed(id){
    console.log("working on call");
    let issues = JSON.parse(localStorage.getItem('issues'));

    for(let i=0; i<issues.length;i++){
        if(issues[i].id == id){
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'));

    for(let i=0;i<issues.length;i++){
        if(issues[i].id == id){
            issues.splice(i,1);
        }
    }
    localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
}

//to fetch already created issues from storage of browser(cookies in general)
function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById("issuesList");
    //showing issues from local strorage to the application
    issuesList.innerHTML = "";

    for(let i=0;i<issues.length;i++){
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        issuesList.innerHTML += `
            <div class="jumbotron">
                <h6>Issue IDs : ${id}</h6>
                <p>
                <span class="badge badge-info">${status}</span>
                </p>
                <h3>${desc}</h3>
                <p>
                <span class="fa fa-clock-o"> ${severity}</span>
                </p>
                <p>
                <span class="fa fa-user"> ${assignedTo}</span>
                </p>
                <a href="javascript:void(0)" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
                <a href="javascript:void(0)" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
            </div>
        `;
    }
}