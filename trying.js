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

// on click of the makeMe button do the following:
$('.makeMe').on('click', function (event) {
    // on click of the button prevent the native behaviour of the browser, to refresh when a button is clicked. 
    event.preventDefault();
    //  on selection of radio button store the user selection as a variable called userSelection.
    const userSelection = $('input[name=selection]:checked').val();

    console.log(userSelection)
})



// make sure the document is ready
$(function () {
    cocktailApp.getDrinks(`Alcoholic`);
    // cocktailApp.getDrinks(`Non_Alcoholic`);

});

