const divContainer = document.querySelector("div.container");
const divHeader = divContainer.querySelector("div.header");
const divContent = divContainer.querySelector("div.content");
const spanCity = divHeader.querySelector("span.city");
const divCities = divHeader.querySelector("div.cities")
const header = divContainer.querySelector("div.content span.temprature");

const timing = {duration: 500, easing: "cubic-bezier(0,.48,.28,1.26)"};

function updateContents(city) {
  let APIKey = "0306ed3057f03485ffb9efd56c98131c";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
  .then(response => response.json()).then(json => {
    ["temp", "temp_max", "temp_min"].forEach(data => {
      divContent.querySelector(`span#${data}`).innerHTML = Math.round(json.main[data]) + "°C";
    });
    ["humidity", "pressure"].forEach(data => {
      divContent.querySelector(`span.value#${data}`).innerHTML = json.main[data];
    })
    divContent.querySelector("span.value#wind").innerHTML = json.wind.speed;
    divContent.querySelector("span.description#description").innerHTML = json.weather[0]["description"].split("").map((l, o) => o === 0 ? l.toUpperCase() : l).join("");
  })
}

updateContents("Kuala Lumpur");

Array.from(divCities.children).forEach(span => {
  span.addEventListener("click", function() {
    spanCity.innerHTML = span.innerHTML;
    divHeader.classList.remove("focused");
    updateContents(span.innerHTML);
  })
})
spanCity.addEventListener("focus", function() {
  divHeader.classList.add("focused");
})