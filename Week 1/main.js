// convert the response fetch back into the appropriate type
function convertToJson(response) {
    if (response.ok) {
        return response.json();
    }
    else {
        throw new Error("Bad Response");
    }
}

// when we have the data, we need to do something with it. This won't always be the same.
function getData(url, callback) {
    // fetch returns a promise that we can process using .then()
    fetch(url)
        .then(convertToJson)
        .then((data) => {
            console.log(data);
            // notice this is where we execute the function passed in. 
            if(callback){
                callback(data);
            }
        });
}
// getData("https://pokeapi.co/api/v2/type");

// PHASE 2

window.addEventListener("load", function () {
    // get and display the list of tupes
    getData("https://pokeapi.co/api/v2/type", renderTypeList);

    // PHASE 3
    document
        .getElementById("typeList")
        .addEventListener("click", typeClickedHandler);
});

// create a simple html markup to display a list
function renderTypeList(list) {
    const element = document.getElementById('typeList');
    // We know that we need to access the 'results' from the console.log return
    // const cleanList = list.results;
    //PHASE 4 EDIT
    const cleanList = cleanTypeList(list.results);

    cleanList.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name}`;

        li.setAttribute("data-url", item.url);
        element.appendChild(li);
    });
}

// PHASE 3
function typeClickedHandler(event) {
    // Note the difference between between event.target and event.currentTarget in this case.
    console.log(event.target);
    console.log("current:", event.currentTarget);
    const selectedType = event.target;

    // when we bult the type list we embedded the url in the element, we can retrieve that through element.datset
    const url = selectedType.dataset.url;

    // PHASE 4
    setActive(url);

    getData(url, renderPokeList);
}

function renderPokeList(list) {
    const element = document.getElementById("pokeList");
    element.innerHTML = "";
    list.pokemon.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.pokemon.name}`;
        li.setAttribute("data-url", item.pokemon.url);
        element.appendChild(li);
    });
}

// PHASE 4 
function setActive(type) {
    // use querySelectorAll to get all of the type li elements
    const allTypes = document.querySelectorAll(".types > li");
    allTypes.forEach((item) => {
        //check to see if this is the one to make active
        if (item.dataset.url === type) {
            item.classList.add("active");
        }
        else {
            item.classList.remove("active");
        }
    });
}

function cleanTypeList(list) {
    return list.filter((item) => item.name != "shadow" && item.name != "unknown");
}