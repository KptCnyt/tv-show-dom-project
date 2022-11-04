let container = document.getElementById("cntn")
let searchBar = document.getElementById("searchBar");
let allEpisodes = getAllEpisodes();
let displayCount = document.createElement("h5")
    displayCount.setAttribute("id", "displaying");
    displayCount.setAttribute("class", "ml-3")
let box = document.getElementById("boxe");
box.appendChild(displayCount)
let result = document.getElementById("displaying")
let dropdown = document.getElementById("dropdown")
    
let filteredObj;
setup(allEpisodes)
searchBar.addEventListener("keyup", (e) => {
  container.innerHTML = ""
  let searchValue = e.target.value.toLowerCase();
  let allEps = getAllEpisodes();
  let filteredObj = allEps.filter(val => {
    return val.name.toLowerCase().includes(searchValue)
  })
  result.innerText = filteredObj.length == 0 ? "Sorry, there is no result :("
  :`Displaying ${filteredObj.length}/${allEpisodes.length}`
  setup(filteredObj)
})
  

function setup(eps) {
for(let i in eps){
  let season = eps[i].season>9?`${eps[i].season}`:`0${eps[i].season}`
  let episode = eps[i].number>9?`${eps[i].number}`:`0${eps[i].number}`
  let card = `
  
  <div class="card rounded-3" style="width: 18rem;" id="${i}">
     <img class="card-img-top rounded" src="${eps[i].image.medium}" alt="Card image cap">
     <div class="card-title text-center border">
     <h5 class="card-header bg-danger text-light">${eps[i].name} - S${season}E${episode}</h5>
     </div>
     
     <div class="card-text p-3">
      ${eps[i].summary}
     </div>
   </div>
   `

   let option = `<a class="dropdown-item itemFound" name="${i}" href="#" onclick="itemFounder(event)">${eps[i].name}</a>`
   dropdown.insertAdjacentHTML("beforeend",option)
   container.insertAdjacentHTML("beforeend",card)
}
   let input = searchBar.value;
   console.log(input)
   let summ = document.getElementsByClassName("card-text")
   let titl = document.getElementsByClassName("card-header")
   let exp = new RegExp(input , "gi")
   
   for(let i in summ){
    if(input !== "" && input.length>2){
      
      summ[i].innerHTML = summ[i].innerHTML.replaceAll(exp,match => `<mark>${match}</mark>`)
      titl[i].innerHTML = titl[i].innerHTML.replaceAll(exp,match => `<mark>${match}</mark>`)
     }
   }
}

function itemFounder(e){
  container.innerHTML =""
  setup(allEpisodes)
  let getId = e.target.name;
  e.target.setAttribute("href", `#${getId}`)
  let input = e.target.innerText;
   
   let summ = document.getElementsByClassName("card-text")
   let titl = document.getElementsByClassName("card-header")
   let exp = new RegExp(input , "gi")
 
   for(let i in summ){
    
    if(input !== ""){
      
      summ[i].innerHTML = summ[i].innerHTML.replace(exp,match => `<mark>${match}</mark>`)
      titl[i].innerHTML = titl[i].innerHTML.replace(exp,match => `<mark>${match}</mark>`)
     }
   }
 }

