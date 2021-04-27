const fetchMyData = () => {
  fetch(
    "https://api.discogs.com/database/search?token=CAZzhmuKmjlimgcwqBbGmFwXWKwXKpUZZdxBaCBD&type=release&page=200&per_page=50"
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((releases) => {
      document.getElementById("loading").style.display = "none";
      //  let myReleases = releases.results
      console.log(releases);
      displayData(releases.results);
      createSelectOptions(releases.results);
      addEvents(releases.results);
    });
};
// .catch((err) => {
//     console.log(err);
// });
if (document.title === "table") {
  fetchMyData();
}
// console.log(data);

const showError = (err) => {
  document.getElementById("error").innerHTML = err;
};

const displayData = (releases) => {
  const tbody = document.getElementById("my-list");
  tbody.innerHTML = " ";
  releases.forEach((release) => {
    const value = release.title.split(" - ");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td.innerHTML = value[0];
    tr.appendChild(td);
    td1.innerHTML = value[1];
    tr.appendChild(td1);
    td2.innerHTML = release.genre;
    tr.appendChild(td2);
    td3.innerHTML = release.style;
    tr.appendChild(td3);
    tbody.appendChild(tr);
  });
};

const addEvents = (releases) => {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filterData(releases);
    });
  });
};

// const createSelectOptions = (releases) => {
//   let countries = releases.map((release) => {
//     return release.country;
//     countries.push(country);
//   });

//   console.log(countries);
//   let select = document.getElementById("country-select");
//   countries.forEach((country) => {
//     let option = document.createElement("option");
//     option.innerHTML = country;
//   });
// };

const createOptions = (uniqueStyles) => {
      console.log(uniqueStyles);
  let select = document.getElementById("style-select");
  let temporary = "";
    uniqueStyles.forEach((style) => {
        temporary += `<option value=`${ style } `>${style}</option>`;
    });
    console.log(temporary);
    select.innerHTML = temporary;
};
const createSelectOptions = (releases) => {
  let styles = releases.map((release) => {
    return release.style;
  });
  const styles1 = styles.flat();
  console.log(styles1);


  let uniqueStyles = styles1.filter((style, index) => {
    return styles1.indexOf(style) === index;
  });
  createOptions(uniqueStyles);
};


const createOptions = (styles) => {
    console.log(styles)
    //   let temporary = "";

//   let select = document.getElementById("style-select");
//   let temporary = "";
//   console.log(styles);
//   styles.forEach((style) => {});
// };
// let select = document.getElementById("style-select");
// styles.forEach((style) => {
//   let option = document.createElement("option");
//   option.innerHTML = style;
//   select.appendChild(option);
// });

const filterData = (releases) => {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  );
  console.log("checkboxes", checkboxes);
  const checkboxesVal = checkboxes.map((checkbox) => {
    return checkbox.value;
  });
  let filteredData = [];
  if (checkboxesVal.length === 0) {
    displayData(releases);
  } else {
    releases.forEach((release) => {
      release.genre.forEach((oneGenre) => {
        if (checkboxesVal.includes(oneGenre)) {
          filteredData.push(release);
        }
      });
    });
    console.log(filteredData);
    displayData(filteredData);
  }
};
