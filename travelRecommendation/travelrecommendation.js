let search_button = document.getElementById("searchbtn");
let clear_button = document.getElementById("clearbtn");
let result = document.getElementById("resultContainer");
let dropdown = document.getElementById("dropdown");
let close_button = document.getElementById("close-btn");
let search_input = document.getElementById("searchinput");

const clearsearch = () => {
  search_input.value = "";
  dropdown.style.display = "none";
  console.log("Clearing");
};

clear_button.addEventListener("click", clearsearch);

const resetResult = () => {
  result.innerHTML = "";
}
const showResult = (name, img, info) => {
  dropdown.style.display = "block";
  const div = document.createElement("div");
  div.classname = "destination";
  div.innerHTML = `
    <div class="destination">
    <h2 class="title">${name}</h2>
    <img class="search-img" src=${img} alt="${name}">
    <p class="description">${info}</p>
    </div>
  `;
  result.appendChild(div);
};

const closeDropdown = () => {
  dropdown.style.display = "none";
  search_input.value = "";
};

close_button.addEventListener("click", closeDropdown);

const searchError = () => {
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }

  result.innerHTML = `<p class="notfound">Sorry we can't find your search</p>`;
};

fetch("travel1.json")
  .then((res) => res.json())
  .then((data) => {
    const search = () => {
      let searchQuery = search_input.value.toLowerCase();
      let notfound = true;
      resetResult();

      data.countries.map((country) => {
        country.cities.map((city) => {
          if (city.name.toLowerCase().includes(searchQuery)) {
            showResult(city.name, city.imageUrl, city.description);
            notfound = false;
          }
        });
      });
      if(searchQuery === "country" || searchQuery === "countries") {
        data.countries.map((country) => {
          country.cities.map((city) => {
            showResult(city.name, city.imageUrl, city.description);
            notfound = false;
          });
        });
      }

      else if(searchQuery === "temple" || searchQuery === "temples") {
        data.temples.map((temple) => {
          showResult(temple.name, temple.imageUrl, temple.description);
          notfound = false;
        });
      }

      else if(searchQuery === "beach" || searchQuery === "beaches") {
        data.beaches.map((beach) => {
          showResult(beach.name, beach.imageUrl, beach.description);
          notfound = false;
        });
      }

      if (notfound) {
        console.log("Error, not found");
        searchError();
      }
    };

    search_button.addEventListener("click", search);
    search_input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        dropdown.style.display = "none";
        search_button.click();
      }
    });
  });
