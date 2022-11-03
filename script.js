let container = document.getElementById("cntn")
let searchBar = document.getElementById("searchBar");
let allEpisodes = getAllEpisodes();
setup(allEpisodes)
searchBar.addEventListener("keyup", (e) => {
  container.innerHTML = ""
  let searchValue = e.target.value.toLowerCase();
  
  let allEps = getAllEpisodes();
  let filteredObj = allEps.filter(val => {
    return val.name.toLowerCase().includes(searchValue)
  })
  
  setup(filteredObj)
})

function setup(eps) {
for(let i in eps){
  let season = eps[i].season>9?`${eps[i].season}`:`0${eps[i].season}`
  let episode = eps[i].number>9?`${eps[i].number}`:`0${eps[i].number}`
  let card = `
  
  <div class="card" style="width: 18rem;" id="${i}">
     <img class="card-img-top border" src="${eps[i].image.medium}" alt="Card image cap">
     <div class="card-title text-center border">
     <h5 class="card-header">${eps[i].name} - S${season}E${episode}</h5>
     </div>
     <div class="card-text border">
       ${eps[i].summary}
     </div>
   </div>
   `
   container.insertAdjacentHTML("beforeend",card)

}
}

function makePageForEpisodes(episodeList) {
  
}


