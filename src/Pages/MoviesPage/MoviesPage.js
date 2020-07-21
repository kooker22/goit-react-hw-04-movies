import React, { Component } from 'react';
import { NavLink, withRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import SearchForm from '../../Components/Form';
import commonStyle from '../../commonStyles/movieList.module.css';
import { key, baseUrl } from '../../services/api';

class MoviesPage extends Component {
  static propTypes = {
    movieName: PropTypes.string,
    movieList: PropTypes.array,
  };
  state = {
    movieName: '',
    movieList: [],
  };
  componentDidMount() {
    if (localStorage.getItem('query') !== null) {
      this.requiredMovies();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieName !== this.state.movieName) {
      this.requiredMovies();
    }
  }
  queryToLS = string => localStorage.setItem('query', string);
  formSubmitHandler = string => {
    this.queryToLS(string);
    this.setState({ movieName: localStorage.getItem('query') });
  };
  requiredMovies = () => {
    Axios.get(
      `${baseUrl}?api_key=${key}&query=${localStorage.getItem('query')}`,
    ).then(response => this.setState({ movieList: response.data.results }));
  };
  render() {
    const { movieList, movieName } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.formSubmitHandler} />
        <ul className={commonStyle.movieList}>
          {movieList.map(movie => (
            <li key={movie.id} className={commonStyle.movieListItem}>
              <NavLink
                to={{
                  pathname: `${this.props.match.url}/${movie.id}`,
                  search: movieName,
                  state: {
                    from: this.props.location,
                  },
                }}
                className={commonStyle.listItem}
              >
                {movie.title}
              </NavLink>
            </li>
          ))}
          <Route
            path={`${this.props.match.path}/?query=${this.state.movieName}`}
          />
        </ul>
      </>
    );
  }
}
export default withRouter(MoviesPage);
