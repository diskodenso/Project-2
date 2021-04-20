console.log(data);
const releases = data.results;
console.log(releases);


const tbody = document.getElementById("my-list");
 releases.forEach(function (release) {
     const tr = document.createElement("tr");
     const td = document.createElement("td")
     const td2 = document.createElement("td")
     td.innerHTML = release.title;
     tr.appendChild(td);
     td2.innerHTML = release.genre
     tr.appendChild(td2)
     tbody.appendChild(tr);
 });

 let str = td
 // Splitt Artist and release title 
//  function myFunction() {
//   let str = "How are you doing today?";
//   var res = str.split("o");
//   document.getElementById("demo").innerHTML = res;

// const countries = [];
// releases.forEach(function (release) {
//     countries.push(release.country);
// })
// console.log(countries);

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

fetch