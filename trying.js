// holds everything safely
cocktailApp = {}

cocktailApp.key = `1`;

// Made initial API call to gather all of the data from that specific endpoint. 
// getDrinks is the function that will call the API, userchoice is the argument that wil hold "alcoholic" or "non-alcoholic" drink types. Which will lead to two different API endpoints. 

cocktailApp.getDrinks = function (userChoice) {
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
        cocktailApp.chooseDrinks(results.drinks);
    })
}
// defining the chooseDrinks function that will take the array drinksArray as an argument. 
cocktailApp.chooseDrinks = function (drinksArray) {
    console.log(drinksArray);
}

//on click of the thirsty button, do the following
$('.thirsty').on('click', function (event) {
    event.preventDefault();
    //this is so that the id doesn't keep appending to the URL every time you click the button
    const location = window.location.href.split('#')[0];
    //this is appending the #questionPage id to the url of where we are so that it takes us there
    window.location = `${location}#questionPage`;
})

// on click of the makeMe button do the following:
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

    // if (userSelection == 'alcoholic') {
    //     cocktailApp.getDrinks(`Alcoholic`);
    //     // console.log('worked');
    // } else {
    //     cocktailApp.getDrinks(`Non_Alcoholic`);
    //     // console.log('it worked');
    // }

    if (userSelection == 'alcoholic') {
        const alcDrinksArray = cocktailApp.getDrinks(`Alcoholic`);
        // console.log('worked');
    } else {
        const nonAlcDrinksArray = cocktailApp.getDrinks(`Non_Alcoholic`);
        // console.log('it worked');
    }

})





// make sure the document is ready
$(function () {
    // cocktailApp.getDrinks(`Alcoholic`);
    // cocktailApp.getDrinks(`Non_Alcoholic`);

});

