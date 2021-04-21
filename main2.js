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

const showError = (err) => {
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