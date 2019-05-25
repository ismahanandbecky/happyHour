// holds everything safely inside an object
cocktailApp = {}

//putting our API key inside the object, we will grab it later
// cocktailApp.key = `1`;

// getDrinks is the function that will call the API, userchoice is the argument that will hold "alcoholic" or "non_alcoholic" drink types which will lead to two different API endpoints. 
cocktailApp.getDrinks = function (userChoice) {
    // Made API call to gather all of the data from the API
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/filter.php",
        method: 'GET',
        dataType: 'json',
        data: {
            a: userChoice
        }
        // the then function is gathering all the results from our API call. and returning the results as an object called results.
    }).then(function (results) {
        // calling the chooseDrinks function and passing the argument results.drinks
        // cocktailApp.chooseDrinks(results.drinks);
        cocktailApp.randomDrink = cocktailApp.randomDrinkIndex(results.drinks);
        console.log(cocktailApp.randomDrink);
        cocktailApp.drinkID = cocktailApp.randomDrink.idDrink;
        console.log(cocktailApp.drinkID);
        $('.resultName').html(`<p class="theDrink">${cocktailApp.randomDrink.strDrink}</p>`);

        $.ajax({
            url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php",
            method: 'GET',
            dataType: 'json',
            data: {
                i: cocktailApp.drinkID,
            }
        }).then(function (results) {
            cocktailApp.drinkData = results.drinks;
            console.log(cocktailApp.drinkData);
            $(`.instructions`).html(`<p>${cocktailApp.drinkData[0].strInstructions}</p>`)
            $('.ingredientList').html(`<li>${cocktailApp.drinkData[0].strIngredient1}</li>`)
                .append(`<li>${cocktailApp.drinkData[0].strIngredient2}</li>`)
                .append(`<li>${cocktailApp.drinkData[0].strIngredient3}</li>`)
                .append(`<li>${cocktailApp.drinkData[0].strIngredient4}</li>`)
                .append(`<li>${cocktailApp.drinkData[0].strIngredient5}</li>`);
        });
    });
}

cocktailApp.randomDrinkIndex = function (optionsArray) {
    let randomIndex = Math.floor(Math.random() * optionsArray.length);
    return optionsArray[randomIndex];
}

cocktailApp.setUpButtonActions = function () {
    //on click of the thirsty button, do the following
    $('.thirsty').on('click', function (event) {
        event.preventDefault();
        //this is so that the id doesn't keep appending to the URL every time you click the button
        const location = window.location.href.split('#')[0];
        //this is appending the #questionPage id to the url of where we are so that it takes us there
        window.location = `${location}#questionPage`;

        $('div.image2').addClass('wobble-hor-bottom');
    });

    //on click of the makeMe button do the following:
    $('.makeMe').on('click', function (event) {
        // on click of the button prevent the native behaviour of the browser, to refresh when a button is clicked. 
        event.preventDefault();

        //this is so that the id doesn't keep appending to the URL every time you click the button
        const location = window.location.href.split('#')[0];
        //this is appending the #resultPage id to the url of where we are so that it takes us there
        window.location = `${location}#resultPage`;

        //on selection of radio button store the user selection as a variable called userSelection.
        const userSelection = $('input[name=selection]:checked').val();
        console.log(userSelection)

        const alcDrinksArray = cocktailApp.getDrinks(userSelection);

        if (userSelection === `alcoholic`) {
            $(`.forHeader`).html(`<h3>You deserve a cocktail!</h3>`);
        } else {
            $(`.forHeader`).html(`<h3>You get a mocktail.</h3>`);
        }

        $('div.image3').addClass('wobble-hor-bottom');
    });
}


// defining the init function which will call our methods inside the cocktailApp object and make them run immediately on page load
cocktailApp.init = function () {
    cocktailApp.setUpButtonActions();
}
// make sure the document is ready and run the init function
$(function () {
    cocktailApp.init();
});

