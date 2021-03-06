const searchBtnId = document.getElementById('button-search');
const searchInputBox = document.getElementById('search-input-box');

searchInputBox.addEventListener('keypress',(event)=>{
    if(event.keyCode == 13){
        searchBtnId.click();
    }
});


const searchResultContainer = document.getElementById('result-container');
const errorMsg = document.getElementById('error-msg');
const spinner = document.getElementById('spinner');
const searchBtn =() =>{
    errorMsg.innerText='';
    spinner.classList.remove('d-none');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputBox.value}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showMeals(data.meals))
    searchInputBox.value ='';
}
const showMeals = (meals) =>{
    spinner.classList.add('d-none');
    searchResultContainer.innerHTML='';
    if(meals == null){
        errorMsg.innerText='No match Found!';
    }
    else{
        errorMsg.innerText='';
        meals.forEach( meal =>{
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
            <div class="card h-100">
                <img class="img-fluid" src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                </div>
            </div>
            `;
            searchResultContainer.appendChild(div);
        });
    }
}