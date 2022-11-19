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
let card;
setup(allShows);

  
// Show dropdown elements
function setup(eps) {
for(let i in eps){
  // let season = eps[i].season>9?`${eps[i].season}`:`0${eps[i].season}`
  // let episode = eps[i].number>9?`${eps[i].number}`:`0${eps[i].number}`
  let img = eps[i].image
  if(img == null){
    img = ""
  }
  let card = `
  
  <div class="card rounded-3 col-md-6 p-0"  id="${i}">
     <img class="card-img-top rounded heights" src="${img.medium}" alt="Card image cap">
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
}
   
   
}
// Show episodes

function makePageForEpisodes(eps) {
  container.innerHTML = ""
  dropdown2.innerHTML = ""
    for(let i in eps){
      // let season = eps[i].season>9?`${eps[i].season}`:`0${eps[i].season}`
      // let episode = eps[i].number>9?`${eps[i].number}`:`0${eps[i].number}`
      let img = eps[i].image
      if(img == null){
        img = ""
      }
      let card = `
      
      <div class="card rounded-3 col-md-6 p-0"  id="${i}">
         <img class="card-img-top rounded heights" src="${img.medium}" alt="Card image cap">
         <div class="card-title text-center border">
         <h5 class="card-header markup bg-danger text-light">${eps[i].name}</h5>
         </div>
         
         <div class="card-text markup p-3">
          ${eps[i].summary}
         </div>
       </div>
       `
    
       let option = `<a class="dropdown-item itemFound" name="${i}">${eps[i].name}</a>`
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
    input.addEventListener('keyup',(event)=>{
    let episodes=response
    const searchValue=event.target.value
    const filteredepisodes=episodes.filter(episode=>{
    return (episode.name.toLowerCase().includes(searchValue.toLowerCase()) 
    || episode.summary.toLowerCase().includes(searchValue.toLowerCase()))

   })
   let spanEl=document.getElementById('count-epispde')
    spanEl.innerText=`Displaying ${filteredepisodes.length} / ${episodes.length}`
    makePageForEpisodes(filteredepisodes)

  })

    })}

    dropdown.addEventListener('click',(e)=>{
      
        let showid=e.target.id;
        getfetch(showid)
      
     })

     dropdown2.addEventListener("click", (e)=>{
      let getId = e.target.name;
      e.target.setAttribute("href", `#${getId}`)
      let summ = document.getElementsByClassName("markup")
      
      let input = e.target.innerText;
      let exp = new RegExp(input , "gi")
      
     for(let i in summ){
      if(input !== ""){
      summ[i].innerHTML = summ[i].innerHTML.replace(exp,match => `<mark>${match}</mark>`)
      
     }
   }
     })

 function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}