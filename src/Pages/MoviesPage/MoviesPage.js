import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import SearchForm from '../../Components/Form';
import commonStyle from '../../commonStyles/movieList.module.css';

class MoviesPage extends Component {
  static propTypes = {
    movieName: PropTypes.string,
    movieList: PropTypes.array,
  };
  state = {
    movieName: '',
    movieList: [],
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieName !== this.state.movieName) {
      this.requiredMovies();
    }
  }
  baseUrl = 'https://api.themoviedb.org/3/search/movie';
  key = '1e5ce310b13e54a49c5d34c28a1fb385';
  formSubmitHandler = string => {
    this.setState({ movieName: string });
  };
  requiredMovies = () => {
    Axios.get(
      `${this.baseUrl}?api_key=${this.key}&query=${this.state.movieName}`,
    ).then(response => this.setState({ movieList: response.data.results }));
  };
  render() {
    const { movieList } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.formSubmitHandler} />
        <ul className={commonStyle.movieList}>
          {movieList.map(movie => (
            <li key={movie.id} className={commonStyle.movieListItem}>
              <NavLink
                to={{
                  pathname: `${this.props.match.url}/${movie.id}`,
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
        </ul>
      </>
    );
  }
}
export default withRouter(MoviesPage);
