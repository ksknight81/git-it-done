// variables for the elements on the index page labelled user-form & username
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

// variables to reference the DOM elements
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var formSubmitHandler = function(event) {
  // this will prevent the browser from sending the forms input data to a URL as we will do it in JavaScript
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  // if there is a value to username, run the getuserrepos on the user name and clear out the value of the variable
  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username")
  }
  console.log(event);
}

var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
    
    // request was successful 
    if (response.ok) {
      response.json().then(function(data) {
      displayRepos(data, user);
    });
    } else {
      alert("Error: GitHub User Not Found");
    }  
  })
  .catch(function(error) {
    // notice this '.catch()' getting chained onto the end of the '.then() method
    alert("Unable to connect to GitHub");
  })
};
 
//getUserRepos("lernantino");
// this will run the formSubmitHandler function when the submit is clicked
userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
  }
  
  //clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[1].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = 
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    // append to container
    repoEl.appendChild(statusEl);
    
    
    // append containter to the dom
    repoContainerEl.appendChild(repoEl);
  };

  console.log(repos);
  console.log(searchTerm);
}


