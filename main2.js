console.log(data);
const releases = data.results;
console.log(releases);


const ul = document.getElementById("my-list");
 releases.forEach(function (release) {
     const li = document.createElement("li");
     li.innerHTML = release.title;
     ul.appendChild(li);
 });

 const ul2 = document.getElementById("my-list");
 releases.forEach(function (release) {
     const li = document.createElement("li");
     li.innerHTML = release.style;
     ul2.appendChild(li);
});


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