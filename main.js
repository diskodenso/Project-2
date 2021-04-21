// console.log(data);
// const releases = data.results;
// console.log(releases);


// const tbody = document.getElementById("my-list");
//  releases.forEach(function (release) {
//      const value = release.title.split(" - ")
//      const tr = document.createElement("tr");
//      const td = document.createElement("td")
//      const td1 = document.createElement("td")
//      const td2 = document.createElement("td")
//      td.innerHTML = value[0];
//      tr.appendChild(td);
//      td1.innerHTML = value[1];
//      tr.appendChild(td1);
//      td2.innerHTML = release.genre
//      tr.appendChild(td2)
//      tbody.appendChild(tr);
//  });

//  // Splitt Artist and release title 
// //  function myFunction() {
// //   let str = "How are you doing today?";
// //   var res = str.split("o");
// //   document.getElementById("demo").innerHTML = res;

// // const countries = [];
// // releases.forEach(function (release) {
// //     countries.push(release.country);
// // })
// // console.log(countries);

function showHide(event) {
let moreText = document.getElementById("moreText");
let buttonID = event.target.id;

    if (!moreText.classList.contains("show")) {
        moreText.classList.add("show");
            document.getElementById(buttonID).innerHTML = "show less...";
    } else {
        moreText.classList.remove("show");
            document.getElementById(buttonID).innerHTML = "show more...";
    }
}
let button = document.getElementById("showMoreButton");
button.addEventListener("click", function (event) {
    showHide(event);
});


fetch("https://api.discogs.com/database/search?token=CAZzhmuKmjlimgcwqBbGmFwXWKwXKpUZZdxBaCBD&type=release&page=200&per_page=50")
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((releases) => {
        console.log(releases);
         let myReleases = releases.results
        displayData(myReleases);
    })
    .catch((error) => {
        console.log(error);
    });
// console.log(data);

const showError = (er) => {
    document.getElementById("error").innerHTML = err;
};

const displayData = (releases) => {
    const tbody = document.getElementById("my-list");
 releases.forEach(function (release) {
     const value = release.title.split(" - ")
     const tr = document.createElement("tr");
     const td = document.createElement("td")
     const td1 = document.createElement("td")
     const td2 = document.createElement("td")
     const td3 = document.createElement("td")
     td.innerHTML = value[0];
     tr.appendChild(td);
     td1.innerHTML = value[1];
     tr.appendChild(td1);
     td2.innerHTML = release.genre
     tr.appendChild(td2)
     td3.innerHTML = release.style
     tr.appendChild(td3)
     tbody.appendChild(tr);
 });
}

