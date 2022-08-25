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
async fetchMoviesHandler = async () => {
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

## Handling Errors
Normally when we get a response from the server based on our request, it simply returns us a status code to show the result. In **axios** when we get an error-like status code like 400 or 500, it throws and error and we can catch this with the help of `try` block in **async-await** implementation *(with the help of `.catch()` in **.then()** implementation)*. However **fetch** does not throw and error in these scenarios, so we need to handle this on our own:
```javascript
try {
  const response = await fetch("https://swapi.dev/api/films");
  if (!response.ok) {
    throw new Error('Error! Code: ' + response.status);
  }
  ...
} catch (error) {
  setError(error.message);
}
return <p>{error}</p>
```

## Using `useEffect` for Requests
It's a better practice to wrap HTTP Requests with `useEffect``
```javascript
const fetchMoviesHandler = useCallback(async () => {
  setClicked(true);
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch("https://swapi.dev/api/films");
    if (!response.ok) {
      throw new Error("Error! Code: " + response.status);
    }

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
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
}, []);

useEffect(() => {
  fetchMoviesHandler();
}, [fetchMoviesHandler]);
```
> *Please beware that we wrapped our function within `useCallback` because we want it to be only changes whenever its outer dependencies change. Otherwise we would cause an infinite loop with `useEffect`*