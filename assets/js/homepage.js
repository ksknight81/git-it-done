

var getUserRepos = function(user) {

    var user = "ksknight81";
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });

    // fetch("https://api.github.com/users/octocat/repos").then(function(response){
    // //this is a nested .then() which calls the specific 'response' data into an array.  Ie, the specific repos
    // response.json().then(function(data){
    //     console.log(data);
    // });
    // console.log("inside", response);
    // });
}
getUserRepos()
console.log("outside")
