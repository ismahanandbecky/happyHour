// holds everything safely inside an object
cocktailApp = {}

// getDrinks is the function that will call the API, userchoice is the argument that will hold "alcoholic" or "non_alcoholic" drink types which will lead to two different API endpoints. 
cocktailApp.getDrinks = function (userChoice) {
    // Made API call to gather all of the data from the API
    $.ajax({
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
        method: 'GET',
        dataType: 'json',
        data: {
            a: userChoice
        }
        // the then function is gathering all the results from our API call. and returning the results as an object called results.
    }).then(function (results) {
        //call the random index function to get a random drink
        cocktailApp.randomDrink = cocktailApp.randomDrinkIndex(results.drinks);
        //store the ID of that drink (ID given to us in the API) to drinkID variable
        cocktailApp.drinkID = cocktailApp.randomDrink.idDrink;
        //append the name of the random drink to the HTML
        $('.resultName').html(`<p class="theDrink">${cocktailApp.randomDrink.strDrink}</p>`);
        //make second ajax call to the "lookup by cocktail index" endpoint
        $.ajax({
            url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php',
            method: 'GET',
            dataType: 'json',
            data: {
                i: cocktailApp.drinkID,
            }
            //get the results from that API call
        }).then(function (results) {
            //store those results in a variable called drinkData
            cocktailApp.drinkData = results.drinks;
            //append the instructions to the html
            $('.instructions').html(`<p>${cocktailApp.drinkData[0].strInstructions}</p>`)
            //append the ingredients as list items to the ul
            $('.ingredientList').html(`<li>${cocktailApp.drinkData[0].strIngredient1}</li>`)
                .append(`<li>${cocktailApp.drinkData[0].strIngredient2}</li>`)
                .append(`<li>${cocktailApp.drinkData[0].strIngredient3}</li>`)
                .append(`<li>${cocktailApp.drinkData[0].strIngredient4}</li>`)
                .append(`<li>${cocktailApp.drinkData[0].strIngredient5}</li>`);
        });
    });
}

//get a random index from the array of drinks from the API results
cocktailApp.randomDrinkIndex = function (optionsArray) {
    let randomIndex = Math.floor(Math.random() * optionsArray.length);
    return optionsArray[randomIndex];
}

//naming this function with all the even handlers so we can pass it into the init function
cocktailApp.setUpButtonActions = function () {
    //on click of the thirsty button, do the following
    $('.thirsty').on('click', function (event) {
        event.preventDefault();
        //this is so that the id doesn't keep appending to the URL every time you click the button
        const location = window.location.href.split('#')[0];
        //this is appending the #questionPage id to the url of where we are so that it takes us there
        window.location = `${location}#questionPage`;
        //add the animation class to the image
        $('div.image2').addClass('wobble-hor-bottom');
        //remove the animation class from the image so that it can be added on click again later
        $('div.image1').removeClass('wobble-hor-bottom');
    });

    //on click of the makeMe button do the following:
    $('.makeMe').on('click', function (event) {
        // on click of the button prevent the native behaviour of the browser, to refresh when a button is clicked. 
        event.preventDefault();

        //on selection of radio button store the user selection as a variable called userSelection.
        const userSelection = $('input[name=selection]:checked').val();
        //store the array of drinks in a variable
        const alcDrinksArray = cocktailApp.getDrinks(userSelection);

        //print a title to the screen that tells them if they got a cocktail or mocktail based on the userSelection
        if (userSelection === 'alcoholic') {
            $('.forHeader').html(`<h3>You deserve a cocktail!</h3>`);
        } else {
            $('.forHeader').html(`<h3>You get a mocktail.</h3>`);
        }

        //if the user selection is not made, show an error message
        if (!userSelection) {
            $('.warning').addClass('opacity');
            // console.log('not checked')
        //if not, go to the next page to show the result
        } else {
            //this is so that the id doesn't keep appending to the URL every time you click the button
            const location = window.location.href.split('#')[0];
            //this is appending the #resultPage id to the url of where we are so that it takes us there
            window.location = `${location}#resultPage`;
        }

        //add the animation class to the image
        $('div.image3').addClass('wobble-hor-bottom');
        //remove the animation class from the image so that it can be added on click again later
        $('div.image2').removeClass('wobble-hor-bottom');
    });

    //on click of the tryAgain button do the following:
    $('.tryAgain').on('click', function (event) {
        // on click of the button prevent the native behaviour of the browser, to refresh when a button is clicked. 
        event.preventDefault();

        //this is so that the id doesn't keep appending to the URL every time you click the button
        const location = window.location.href.split('#')[0];
        //this is appending the #resultPage id to the url of where we are so that it takes us there
        window.location = `${location}#header`;

        //add the animation class to the image
        $('div.image1').addClass('wobble-hor-bottom');    
        //remove the animation class from the image so that it can be added on click again later
        $('div.image3').removeClass('wobble-hor-bottom');
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

