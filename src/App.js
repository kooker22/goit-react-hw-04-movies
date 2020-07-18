import React, { Component, Suspense, lazy } from 'react';
import routes from './routes';
import './App.css';
import 'modern-normalize/modern-normalize.css';
import { Switch, Route, NavLink } from 'react-router-dom';

const HomePage = lazy(() =>
  import('./Pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './Pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const MoviesPage = lazy(() =>
  import('./Pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
class App extends Component {
  render() {
    return (
      <>
        <ul className="header">
          <li className="menu-item">
            <NavLink exact to="/" className="link">
              Home
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/movies" className="link">
              Movies
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route path={routes.movieDetails} component={MovieDetailsPage} />
            <Route path={routes.movies} component={MoviesPage} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
