# HTTP Requests
## Sending a **GET** Request
In this section **Star Wars API** is used. It may be found under *https://swapi.dev/* or its secondary address *https://swapi.py4e.com/* in case the first one doesn't work...  
We are using [**Fetch API**](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for making HTTP Requests. It is built in all browsers. *An alternative could be [**axios**](https://axios-http.com/docs/intro)*...  
An example **GET** request:
```javascript
const [movies, setMovies] = useState([]);

const fetchMoviesHandler = () => {
  fetch("https://swapi.dev/api/films")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    });
};
```
Async-Await version of the above function:
```javascript
async function fetchMoviesHandler() {
  const response = await fetch("https://swapi.dev/api/films");
  const data = await response.json();

  const transformedMovies = data.results.map((movieData) => {
    return {
      id: movieData.episode_id,
      title: movieData.title,
      openingText: movieData.opening_crawl,
      releaseDate: movieData.release_date,
    };
  });
  setMovies(transformedMovies);
};
```
> *Please keep in mind that **async-await** version is the one which is generally preferred.*