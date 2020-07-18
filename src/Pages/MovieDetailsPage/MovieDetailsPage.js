import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Reviews from '../../Components/Reviews/Reviews';
import Cast from '../../Components/Cast/Cast';

import style from './MovieDetailsPage.module.css';

class MovieDetailsPage extends Component {
  static defaultProps = {
    initialId: null,
    initialPoster: null,
    initialTitle: null,
    initialOverview: null,
    initialGenres: [],
    initialPopularity: null,
  };
  static propTypes = {
    id: PropTypes.number,
    poster: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.string,
    popularity: PropTypes.string,
  };
  state = {
    id: this.props.initialId,
    poster_path: this.props.initialPoster,
    title: this.props.initialTitle,
    overview: this.props.initialOverview,
    genres: this.props.initialGenres,
    popularity: this.props.initialPopularity,
  };
  async componentDidMount() {
    const { movieId } = this.props.match.params;
    await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=1e5ce310b13e54a49c5d34c28a1fb385`,
    ).then(response => {
      const data = response.data;
      this.setState({ ...data });
    });
  }
  baseImageUrl = 'https://image.tmdb.org/t/p/';
  imageSize = 'w300';
  handleGoBack = () => {
    const { location, history } = this.props;
    history.push(location.state.from);
  };
  render() {
    const { id, poster_path, title, overview, genres, popularity } = this.state;
    const fixedPopularity = Number(popularity).toFixed(1);
    return (
      <>
        {id !== null && (
          <div className={style.card}>
            <button
              type="button"
              onClick={this.handleGoBack}
              className={style.goBackBtn}
            >
              Go back
            </button>
            <div className={style.cardWrapper}>
              <div>
                <img
                  src={`${this.baseImageUrl}${this.imageSize}${poster_path}`}
                  alt={title}
                />
              </div>
              <div className={style.movieInfo}>
                <h1>{title}</h1>
                <h2>
                  User score:{' '}
                  <span className={style.userScore}> {fixedPopularity}</span>
                </h2>

                <h2 className={style.heading}> Overview: </h2>
                <p className={style.overview}>{overview}</p>
                <h2>Genres</h2>
                <ul className={style.genres}>
                  {genres.map(genre => (
                    <li key={genre.name} className={style.genresItem}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ul className={style.cardLinks}>
              <li className={style.cardLinksItem}>
                <NavLink
                  to={{
                    pathname: `${this.props.match.url}/cast`,
                    state: {
                      from: this.props.location,
                    },
                  }}
                  className={style.link}
                >
                  Cast
                </NavLink>
              </li>
              <li className={style.cardLinksItem}>
                <NavLink
                  to={{
                    pathname: `${this.props.match.url}/reviews`,
                    state: {
                      from: this.props.location,
                    },
                  }}
                  className={style.link}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>

            <Route
              path={`${this.props.match.path}/cast`}
              render={props => {
                return id !== null && <Cast {...props} movieId={id} />;
              }}
            />

            <Route
              path={`${this.props.match.path}/reviews`}
              render={props => {
                return id !== null && <Reviews {...props} movieId={id} />;
              }}
            />
          </div>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
