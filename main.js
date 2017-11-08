document.addEventListener("DOMContentLoaded", function() {
  fetchEpisodes();
});

let data;

const fetchEpisodes = () => {
  fetch(
    "http://api.tvmaze.com/singlesearch/shows?q=game-of-thrones&embed=episodes"
  )
    .then(res => res.json())
    .then(res => (data = res["_embedded"]["episodes"]));
};

// Render Seasons
document.getElementById("get_seasons").addEventListener("click", () => {
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

function makeEpisodes(data, num) {
  return data.filter(ep => ep.season === parseInt(num));
}
function renderEpisodes(num) {
  const episodes = makeEpisodes(data, num);
  console.log(episodes);
  episodes.forEach(el => {
    let episode = document.createElement("li");
    episode.innerHTML = `<a href="#">${el.number}: ${el.name}</a>`;
    episode.addEventListener("click", () => {
      renderEpisodeView(`${el.id}`);
    });
    document.getElementById("episodes").appendChild(episode);
  });
}

function makeEpisodeView(id, data) {
  return data.filter(ep => ep.id === parseInt(id));
}

function renderEpisodeView(id) {
  const episode = makeEpisodeView(id, data);
  document.getElementById("airdate").innerHTML += `${episode[0].airdate}`;
  document.getElementById("episode").innerHTML += `${episode[0].number}`;
  document.getElementById("title").innerHTML += `${episode[0].name}`;
  document.getElementById("summary").innerHTML += `${episode[0].summary}`;
  // debugger;
  document.getElementById("image").innerHTML += `<img src="${episode[0][
    "image"
  ]["medium"]}">`;
}
