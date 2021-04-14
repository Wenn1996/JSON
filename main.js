const url = 'http://api.giphy.com/v1/gifs/trending?api_key=WlE3mjxtoLLBArbIc71bXa9BDvqqi9k9';
fetch(url)
    .then(response => {
        return response.json();
    })
    .then(responseData => {
        console.log(responseData);

    })
    .catch(err => console.log(err))