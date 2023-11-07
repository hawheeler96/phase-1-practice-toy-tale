let addToy = false;
const alltoys = document.getElementById('toy-collection') //why do i need this again?
document.getElementById('add-toy.form').addEventListener('submit', handleAddNewToy)// adds event listener to form, so on submit it runs handleAddNewToy function
let toyList = []; //will always hold the accurate array of our data 
const toyAPI = 'http://localhost:3000/toys' //makes it easier to fetch data 

//ALREADY HERE 
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
//ALREADY HERE 


fetch(toyAPI)//fetches API 
  .then ((res) => res.json())
  .then(toys => {
    toyList = toys; //sets data inside toylist array 
    renderToys(toyList); //passes that array to renderToys function
  })

  function renderToys(toy) { //toy=the data held in toyList
  alltoys.innerHTML = ''; //makes sure we are working with a blank slate 
  toy.forEach(renderToy); //passes function renderToy for each object in the toy array
}

function renderToy(toy){
  const toyCard = document.createElement('div'); //sets create div to a variable for ease of use
  toyCard.classList.add('card'); //
  alltoys.append(toyCard);

  toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="toy-${toy.id}">Like ❤️</button>`;
  
  const likeButton = document.getElementById(`toy-${toy.id}`);
  likeButton.addEventListener('click', () => handleAddLike(toy));

}

function handleAddLike(toy) {
  const likes = toy.likes+1
  
  fetch(`${toyAPI}/${toy.id}`, {
    method: 'PATCH',
    headers:
    {
     "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes})
  })

  .then(res => res.json())
  .then(() => {
    toy.likes = likes 
    renderToys(toyList);
  })

}

function handleAddNewToy(e) {
  e.preventDefault() ;
  const newToyData = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  fetch(toyAPI, {
    method: 'POST',
    headers:
  {
  "Content-Type": "application/json",
  Accept: "application/json"
  },
  body: JSON.stringify(newToyData)
})
  .then (res => res.json())
  .then(renderToy)

}

