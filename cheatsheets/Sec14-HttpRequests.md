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

## Firebase
[**Firebase**](https://firebase.google.com/) is a backend service provided by Google. It's a free, no code needed backend service which provides lots of features. Please refer to the following course section for explanation on Firebase *https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599822#content*
> *Please beware that when a new project is created, after during creation of the database, do not forget to start it in **Test mode** otherwise we won't be able to send requests. On the other hand if we want to start in normal mode then we need to apply the following rules onto our database under **Rules** tab.*
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

## Sending a 'POST' Request
A sample POST request
```javascript
const addMovieHandler = async (movie) => {
  const response = await fetch('https://somename.firebaseio.com/movies.json', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data)
}
```
Up above by
- `method: 'POST'` we set our *fetch type* to a POST request
- `body: JSON.stringify(movie)` we are turning our object to JSON to be able to give it in correct form
- `headers: {'Content-Type': 'application/json'}` we let server to know that we are passing it a JSON
An extra code piece on how to get data from Firebase, and loop over them to get content:
> *Please beware that it is **required** to add `.json` ending when sending a request to Firebase*
```javascript
const loadedMovies = [];

for (const key in data) {
  loadedMovies.push({
    id: key,
    title: data[key].title,
    openingText: data[key].openingText,
    releaseDate: data[key].releaseDate
  });
}

setMovies(loadedMovies);
```