import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import commonStyle from '../../commonStyles/movieList.module.css';

class HomePage extends Component {
  static propTypes = {
    trendingMovies: PropTypes.array,
  };
  state = {
    trendingMovies: [],
  };
  baseUrl = 'https://api.themoviedb.org/3/trending/movie/day';
  key = '1e5ce310b13e54a49c5d34c28a1fb385';
  async componentDidMount() {
    await Axios.get(`${this.baseUrl}?api_key=${this.key}`).then(response =>
      this.setState({ trendingMovies: response.data.results }),
    );
  }
  render() {
    const { trendingMovies } = this.state;

    return (
      <ul className={commonStyle.movieList}>
        {trendingMovies !== [] &&
          trendingMovies.map(movie => (
            <li key={movie.id} className={commonStyle.movieListItem}>
              <NavLink
                to={{
                  pathname: `${this.props.match.url}movies/${movie.id}`,
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
    );
  }
}

export default HomePage;
