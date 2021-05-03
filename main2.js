// function to fetch the Discogs API (fetch returns a promise (object))
const fetchMyData = () => {
  fetch(
    "https://api.discogs.com/database/search?token=CAZzhmuKmjlimgcwqBbGmFwXWKwXKpUZZdxBaCBD&type=release&page=200&per_page=50"
  )
    // catches our promise when its resolved from fetch
    .then((response) => {
      console.log(response);
      return response.json(); // converting response into a json object
    }) // catch promise  from first then block
    .then((releases) => {
      // converted json object
      document.getElementById("loading").style.display = "none";
      //  let myReleases = releases.results
      console.log(releases);
      displayData(releases.results);
      createSelectOptions(releases.results);
      addEvents(releases.results);
    })
    .catch((err) => {
      console.log(err);
    });
};

// if (document.title === "table") {
fetchMyData();
// }
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
    const td4 = document.createElement("td");
    const imgageElm = document.createElement("img");
    imgageElm.src = release.cover_image;
    imgageElm.width = "60";
    imgageElm.height = "60";
    const td = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td4.appendChild(imgageElm);
    tr.appendChild(td4);
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
// };

const addEvents = (releases) => {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]") // add eventListener to all our checkboxes
  );
  let selectElm = document.getElementById("style-select");
  selectElm.addEventListener("change", () => {
    filterData(releases);
  });
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
  let temporary = "<option value='all'>All</option>";
  uniqueStyles.forEach((style) => {
    temporary += `<option value="${style}">${style}</option>`;
  });
  select.innerHTML = temporary;
};
const createSelectOptions = (releases) => {
  let styles = releases.map((release) => {
    // map is a method that performs a loop on an array and safe the results in our styles variable
    return release.style;
  });
  const styles1 = styles.flat(); // [[1,2,3,4,],[5,6,7,8,]] = bi-dimansonal array which is an array inside an array and we have to loop twice - flat function is transforming our bi-dimansonal array in a one-dimansonal array
  console.log(styles1);

  let uniqueStyles = styles1.filter((style, index) => {
    // searching for dublicates and delete them
    return styles1.indexOf(style) === index;
  });
  createOptions(uniqueStyles); // call the function which manipulates the dom and creates HTML options from the array "unique styles"
};

// sort the styles alphabetically
// impliment the filter when
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
    document.querySelectorAll("input[type=checkbox]:checked") // take all checkboxes which are checked and create an array of it
  ).map((checkbox) => {
    // loop
    console.log(checkbox);
    console.log(checkbox.value);
    return checkbox.value;
  });

  // let filtered = releases.filter((release) => {
  //   if (checkboxes.length === 0 && selectElm === "all") {
  //     return true;
  //   } else if (checkboxes.length !== 0 && selectElm === "all") {
  //     let result = release.genre.map((oneGenre) => {
  //       return checkboxes.includes(oneGenre);
  //     });
  //     console.log(result);
  //   }
  // return (
  //   (checkboxes.length === 0 && selectElm === "all") ||
  //   (checkboxes.length !== 0 &&
  //     selectElm === "all" &&
  //     checkboxes.includes(oneGenre)) ||
  //   (checkboxes.length === 0 &&
  //     selectElm !== "all" &&
  //     selectElm === oneStyle) ||
  //   (selectElm === oneStyle && checkboxes.includes(oneGenre))
  // );
  // });
  // order by alphabetically -
  let selectElm = document.getElementById("style-select").value;
  let filtered = [];
  if (checkboxes.length === 0 && selectElm === "all") {
    filtered = releases;
  } else if (checkboxes.length !== 0 && selectElm === "all") {
    releases.forEach((release) => {
      release.genre.forEach((oneGenre) => {
        if (checkboxes.includes(oneGenre)) {
          filtered.push(release);
        }
      });
    });
  } else if (checkboxes.length === 0 && selectElm !== "all") {
    releases.forEach((release) => {
      console.log(release.style);
      release.style.forEach((oneStyle) => {
        if (selectElm === oneStyle) {
          filtered.push(release);
        }
      });
    });
  } else {
    releases.forEach((release) => {
      release.genre.forEach((oneGenre) => {
        release.style.forEach((oneStyle) => {
          if (selectElm === oneStyle && checkboxes.includes(oneGenre)) {
            filtered.push(release);
          }
        });
      });
    });
  }
  console.log(filtered);
  displayData(filtered);
};
//   let filteredData = [];
//   if (checkboxesVal.length === 0) {
//     displayData(releases);
//   } else {
//     releases.forEach((release) => {
//       release.genre.forEach((oneGenre) => {
//         if (checkboxesVal.includes(oneGenre)) {
//           filteredData.push(release);
//         }
//       });
//     });
//     console.log(filteredData);
//     displayData(filteredData);

// console log the steps you doing understand
