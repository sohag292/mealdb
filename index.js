const loadMeals=(searchText, limit = 4)=>{
    const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    // console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => displayMeals(data.meals.slice(0, limit)))
}

const displayMeals = meals =>{
    // console.log(meals);
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML= '';
    meals.forEach(meal =>{
        // console.log(meal);
        const mealdiv = document.createElement('div');
        mealdiv.classList.add('col-sm-6');
        mealdiv.innerHTML=`
        <div class="card mb-4">
          <div class="row">
              <div class="col-6"> <img style="width:300px;" src="${meal.strMealThumb}" alt="" class="img-fluid"></div>
              <div class="col-6 p-3">
              <h4>${meal.strMeal} </h4>
              <p class="mb-4">There are many variations of passages of available, but the majority have suffered</p>
             <a onclick="loadMealDetails(${meal.idMeal})" class="text-warning" href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Detailes</a>

              </div>  
          </div>
        </div>
        `;
        mealsContainer.appendChild(mealdiv);
    })
}
let search = "";

const searchMeals=()=>{  
    const searchText = document.getElementById('search-field').value;
    search = searchText;
    loadMeals(searchText);
    document.getElementById('search-field').value="";
}

const loadMealDetails = idMeal =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    // console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => displayMealDetails(data.meals[0]));
}

const displayMealDetails = meal =>{
    document.getElementById("mealDetailsLabel").innerText = meal.strMeal;
    const mealsDetails = document.getElementById("mealDetailsBody");
    mealsDetails.innerHTML=`
        <img class="img-fluid" src="${meal.strMealThumb}">
    `
}

const showAllMeals = () => {
    const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    // console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => displayMeals(data.meals))
    
}


loadMeals('fish');