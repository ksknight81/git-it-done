// variable to reference the issues container below
var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // function to fetch the data from apiURL 
    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass the response data to the dom function
                displayIssues(data);
                
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });    
}

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issues on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        // because they have an HTML_URL property, we use the 'target' "_blank" to open it in a new tab instead of using the current page
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);
        // this will allow you to see the list of issues on the page
        issueContainerEl.appendChild(issueEl);
    }
};
// to hard code put in "facebook/react" or "ksknight81/robot-gladiators"
getRepoIssues("ksknight81/git-init-sample");