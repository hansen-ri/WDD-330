const baseUrl = 'https://swapi.dev/api/';

export default class SwapiHelper {
    // expects an id for the output emement, the element where we want the list of films displayed, 
    // and an element that will show during the initial load. 
    constructor(outputId, filmId, loadingId) {
        this.outputId = outputId;
        this.outputElement = document.getElementById(outputId);
        this.filmId = filmId;
        this.filmElement = document.getElementById(filmId);
        this.loadingId = loadingId;
        this.loadingElement = document.getElementById(loadingId);
        this.films = [];
        this.init();
    }
    async init() {
        //the api is sometimes slow... lets gice the users something to look at while they wait...
        this.outputElement.style.display = "none";
        this.loadingElement.style.display = "block";
        this.films = await this.makeRequest(baseUrl + "films");
        this.films = this.films.results;
        console.log(this.films);
        // Once we have our film data remove loading indicator.
        /*Phase 2*/
        this.outputElement.style.display = "initial";
        this.loadingElement.style.display = "none";
        this.clickableList(this.films, this.filmId, this.filmSelected.bind(this));

    }
    async makeRequest(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.text();
                throw new Error(error);
            }
        } catch (err) {
            console.log(err);
        }
    }
    /*Phase 2*/
    clickableList(list, elementId, callback) {
        const element = document.getElementById(elementId);
        element.innerHTML = list.map((film) => `<li>${film.title}</li>`).join("");
        element.addEventListener("click", (e) => {
            console.log(e.target);

            /*Phase 3 */
            this.setActive(element, e.target);
            callback(e.target.innerText);
        });
    }

    async filmSelected(filmTitle) {
        try {
            const film = this.films.find((item) => item.title === filmTitle);
            if (!film) {
                throw new Error("Film not found");
            }
            // setup the intital html structure for the film
            this.outputElement.innerHTML = this.pageTemplate();
            // set film title and other info
            this.outputElement.querySelector(".film-name").innerText = film.title;
            this.outputElement.querySelector(".crawl").innerText = film.opening_crawl;
            //insert planets
            /* Phase 3 */
            const planets = await this.getListDetails(film.planets);
            this.renderList(planets, this.planetTemplate, ".film-planets");
            // insert starships
            const ships = await this.getListDetails(film.starships);
            this.renderList(ships, this.shipTemplate, ".film-starships");
            // do the same for the rest of the lists
            const characters = await this.getListDetails(film.characters);
            this.renderList(characters, this.charactersTemplate, ".film-characters");
        
        } catch (err) {
            console.log(err);
        }
    }
    pageTemplate(filmTitle) {
        return `<h2 class="film-name"></h2>
            <p class="crawl"></p>
            <section class="planets">
                <h3>Planets</h3>
                <ul class="detail-list film-planets"></ul>
            </section>
            <section class="ships">
                <h3>Starships</h3>
                <ul class="detail-list film-starships"></ul>
            </section>
            <section class="characters">
                <h3>Characters</h3>
                <ul class="detail-list film-characters"></ul>
            </section>`;
    }

    /* Phase 3 */

    async getListDetails(list) {
        // By calling map with our makeRequest method we will end up with and array of Promises. We have only ever resolved one promise at a time. 
        // To resolve a list of Promises we need to use Promise.all(listOfPromises)
        const details = await Promise.all(list.map((url) => this.makeRequest(url)));
        console.log(details);
        return details;
    }

    renderList(list, template, outputId) {
        const element = document.querySelector(outputId);
        element.innerHTMl = "";
        // notice that the template that was passed in was a function that will return an HTML string with 
        // the proper values already embedded.
        const htmlString = list.map((item) => template(item));
        element.innerHTML = htmlString.join("");
    }


    setActive(parent, target) {
        // Will add the class of "active" to the list of 
        const children = [...parent.childNodes];
        children.forEach((node) => node.classList.remove("active"));
        target.classList.add("active");
    }

    planetTemplate(planet) {
        return `<li>
            <h4 class="planet-name">${planet.name}</h4>
            <p>Climate:${planet.climate}</p>
            <p>Terrain:${planet.terrain}</p>
            <p>Year:${planet.orbital_period}</p>
            <p>Day:${planet.rotation_period}</p>
            <p>Population:${planet.population}</p>
        </li>`
    }

    shipTemplate(ship) {
        return `<li>
            <h4 class="ship-name">${ship.name}</h4>
            <p>Model:${ship.model}</p>
            <p>Class:${ship.starship_class}</p>
            <p>Crew/Passengers:${ship.crew} / ${ship.passengers}</p>
            <p>Length: ${ship.length}</p>
            <p>Speed:${ship.max_atmosphering_speed}</p>
        </li>`
    }

    charactersTemplate(character) {
        return `<li>
            <h4 class="character-name">${character.name}</h4>
            <p>Height:${character.height}</p>
            <p>Mass:${character.mass}</p>
            <p>Hair Color:${character.hair_color}</p>
            <p>Skin Color:${character.skin_color}</p>
        </li>`
    }
}