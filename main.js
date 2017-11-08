document.addEventListener("DOMContentLoaded", function() {
  getEpisodes();
});

let data;

const getEpisodes = () => {
  fetch(
    "http://api.tvmaze.com/singlesearch/shows?q=game-of-thrones&embed=episodes"
  )
    .then(res => res.json())
    .then(res => (data = res["_embedded"]["episodes"]));
};

document.getElementById("get_seasons").addEventListener("click", () => {
  // debugger;
  const allSeasons = makeSeasons(data);
  allSeasons.forEach(el => {
    let season = document.createElement("li");
    season.innerHTML = `<a href="#">Season ${el}</a>`;
    season.className = `${el}`;
    season.addEventListener("click", () => {
      renderEpisodes(`${season.className}`); //.bind(season);
    });
    document.getElementById("seasons").appendChild(season);
  });
});

function makeSeasons(data) {
  let newAry = [];
  let seasons = data.map(episode => {
    let number = episode.season;
    return number;
  });
  // returns an array of seasons for each episode eg [1,1,1,2,2,2....]
  for (i = 0; i < seasons.length; i++) {
    if (!newAry.includes(seasons[i])) {
      newAry.push(seasons[i]);
    }
  }
  return newAry;
}

function renderEpisodes(num) {
  const episodes = makeEpisodes(data, num);
  console.log(episodes);
  let episode = document.createElement("li");

  // document.getElementById("episodes").innerHTML += episode
}

function makeEpisodes(data, num) {
  return data.filter(ep => ep.season === parseInt(num));
}
