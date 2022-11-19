let container = document.getElementById("cntn")
let searchBar = document.getElementById("searchBar");
let allShows = getAllShows();
let displayCount = document.createElement("h5")
    displayCount.setAttribute("id", "displaying");
    displayCount.setAttribute("class", "ml-3")
let box = document.getElementById("boxe");
box.appendChild(displayCount)
let result = document.getElementById("displaying")
let dropdown = document.getElementById("dropdown")
let dropdown2 = document.getElementById("dropdown2")
let home = document.getElementById("homebtn")


// Display all of the shows and tv icon
setup(allShows);
home.addEventListener("click", (e)=> {
  container.innerHTML = "";
  setup(allShows)
})
home.style.cursor="pointer"

// Search bar for show page

    searchBar.addEventListener('keyup',(event)=>{
    container.innerHTML = ""
    const searchValue=event.target.value
    const filteredepisodes=allShows.filter(show=>{
    return (show.name.toLowerCase().includes(searchValue.toLowerCase()) 
    || show.summary.toLowerCase().includes(searchValue.toLowerCase()))

   })
   let spanEl=document.getElementById('count-epispde')
    spanEl.innerText=`Displaying ${filteredepisodes.length} / ${allShows.length}`
    setup(filteredepisodes)

  })
  
// Show dropdown elements

function setup(eps) {
  
for(let i in eps){
  if(eps[i].image == null){
    eps[i].image = {};
    eps[i].image.medium = ""
  }
  let card = `
  
  <div class="card rounded-3 col-md-12 p-0" name="${eps[i].id}">
     <div style="display:flex">
     <img class=" rounded heights" src="${eps[i].image.medium}" alt="Card image cap">
     <div class="direction">
     <h3 class="sizing">Language : ${eps[i].language}</h3>
     <h3 class="sizing">Rating : ${eps[i].rating.average}</h3>
     <h3 class="sizing">Genres : ${eps[i].genres}</h3>
     <h3 class="sizing">Status : ${eps[i].status}</h3>
     </div>
     </div>
     
     <div class="card-title text-center border">
     <h5 class="card-header bg-danger text-light">${eps[i].name}</h5>
     </div>
     
     <div class="card-text p-3">
      ${eps[i].summary}
     </div>
   </div>
   `

   let option = `<a class="dropdown-item itemFound" id="${eps[i].id}">${eps[i].name}</a>`
   dropdown.insertAdjacentHTML("beforeend",option)
   container.insertAdjacentHTML("beforeend",card)
}}

// Episodes maker

function makePageForEpisodes(eps) {
  container.innerHTML = ""
  dropdown2.innerHTML = ""
    for(let i in eps){
      let season = eps[i].season>9?`${eps[i].season}`:`0${eps[i].season}`
      let episode = eps[i].number>9?`${eps[i].number}`:`0${eps[i].number}`
      let img = eps[i].image
      if(img == null){
        img = ""
      }
      let card = `
      
      <div class="card rounded-3 col-md-4 p-0"  id="${i}">
         <img class="card-img-top rounded widths" src="${img.medium}" alt="Card image cap">
         <div class="card-title text-center border">
         <h5 class="card-header markup bg-danger text-light">S${season}-E${episode} - ${eps[i].name}</h5>
         </div>
         
         <div class="card-text markup p-3">
          ${eps[i].summary}
         </div>
       </div>
       `
    
       let option = `<a class="dropdown-item itemFound" name="${i}">S${season}-E${episode} - ${eps[i].name}</a>`
       dropdown2.insertAdjacentHTML("beforeend",option)
       container.insertAdjacentHTML("beforeend",card)
    }
}

//EpisodeDropdown
function getfetch(showid){
  let url=`https://api.tvmaze.com/shows/${showid}/episodes`
fetch(url)
  // Get the response and extract the JSON
  .then(function (response) {
    return response.json();
  })
  // Do something with the JSON
  .then((response) => {
    makePageForEpisodes(response)

    let input=document.getElementById('searchBar')
    let spanEl=document.getElementById('count-epispde')
    spanEl.innerText = `${response.length} results displaying..`
    input.addEventListener('keyup',(event)=>{
    let episodes=response
    const searchValue=event.target.value
    const filteredepisodes=episodes.filter(episode=>{
    return (episode.name.toLowerCase().includes(searchValue.toLowerCase()) 
    || episode.summary.toLowerCase().includes(searchValue.toLowerCase()))

   })
   
   if(searchValue !== ""){
    spanEl.innerText=`Displaying ${filteredepisodes.length} / ${episodes.length}`
   }else {
    spanEl.innerText = ""
   }
    makePageForEpisodes(filteredepisodes)
  })
 })}
// show dropdown event listener
    dropdown.addEventListener('click',(e)=>{
      
        let showid=e.target.id;
        searchBar.value = ""
        getfetch(showid)
      
     })

//episodes dropdown event listener
     dropdown2.addEventListener("click", (e)=>{
      searchBar.value = ""
      let getId = e.target.name;
      e.target.setAttribute("href", `#${getId}`)
      let summ = document.getElementsByClassName("markup")
      
      let inputs = e.target.innerText;
      let exp = new RegExp(inputs , "gi")
      
     for(let i in summ){
      if(inputs !== ""){
      summ[i].innerHTML = summ[i].innerHTML.replaceAll(exp,match => `<mark>${match}</mark>`)
      
     }
   }
     })
// back to top
 function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}