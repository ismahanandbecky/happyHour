// holds everything safely
cocktailApp = {}

cocktailApp.key = `1`;


cocktailApp.getDrinks = function (userChoice) {
    // console.log(`its still working`)
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/filter.php",
        method: 'GET',
        dataType: 'json',
        data: {
            a: userChoice
        }

    }).then(function (results) {
        // console.log(results.drinks);
        cocktailApp.chooseDrinks(results.drinks);
        
    }) 
}

cocktailApp.chooseDrinks = function (drinksArray) {
    console.log(drinksArray);
}

$(function () {
    cocktailApp.getDrinks(`Alcoholic`);
    // cocktailApp.getDrinks(`Non_Alcoholic`);
   
})

