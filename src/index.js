

let addToy = false;

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


  
  fetch("http://localhost:3000/toys")
  .then(function (response){
    return response.json();
  })
  .then(function (toys){
    renderAllToys(toys)
    })

    function renderAllToys(toys){
      for(let i=0; i<toys.length; i++){
        renderOneToy(toys[i])
      }
    }

    function renderOneToy(toy){
      const div = document.createElement("div")
        div.setAttribute("class", "card" );
        
    
        const h2 = document.createElement("h2")
        h2.innerHTML = toy.name;
        div.append(h2);
    
    
        const img = document.createElement("img")
        img.setAttribute("src",`${toy.image}`)
        
        img.setAttribute("class", "toy-avatar" );
        div.append(img);
    
        const p = document.createElement("p")
        p.setAttribute("id", "numOfLikes")
        p.innerHTML = toy.likes + " Likes";
        div.append(p);
    
        const button = document.createElement("button")
        button.setAttribute("class", "like-btn" );
        button.setAttribute("id", toy.id);
        button.innerHTML = "Like ❤️";
        button.addEventListener('click', e=> {
          updateLike(toy,p)
        })
        div.append(button)

        document.getElementById("toy-collection").append(div);
    }

    function updateLike(toy,p) {

      console.log("This is the origianl toy object", toy)

      const oldNumOfLikes = toy.likes;
      //console.log(oldNumOfLikes)
      const newNumberOfLikes = oldNumOfLikes +1;
      //console.log(newNumberOfLikes)
      //console.log("toy",toy)

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method:'PATCH',
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": newNumberOfLikes
        })
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (updatedToy) {
        p.innerHTML = `${newNumberOfLikes} Likes`;
       console.log("we are inside of the dot then")
       location.reload()
        })


document.getElementsByClassName('submit').submit.addEventListener('click',postNewToy)




function postNewToy() {
  //console.log("hi")
const inputName = document.getElementsByName("name")[0].value;
const inputUrl = document.getElementsByName("image")[0].value;
    
const submitsToyForm = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify({
    "name": inputName,
    "image": inputUrl,
    "likes": 0
  }),
};

fetch("http://localhost:3000/toys", submitsToyForm)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data)
});

console.log(inputName);
console.log(inputUrl);

}



    }
  });




