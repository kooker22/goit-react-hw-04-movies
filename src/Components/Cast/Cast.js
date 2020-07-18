import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Axios from 'axios';
import style from './Cast.module.css';

class Cast extends Component {
  static defaultProps = {
    initialActors: [],
  };
  static propsTypes = {
    actors: PropTypes.array,
  };
  state = {
    actors: this.props.initialActors,
  };
  baseImageUrl = 'https://image.tmdb.org/t/p/';
  imageSize = 'w500';
  componentDidMount() {
    Axios.get(
      `https://api.themoviedb.org/3/movie/${this.props.movieId}/credits?api_key=1e5ce310b13e54a49c5d34c28a1fb385`,
    ).then(response => this.setState({ actors: response.data.cast }));
  }
  render() {
    const { actors } = this.state;
    return (
      <>
        <ul className={style.actorsList}>
          {actors !== [] &&
            actors.map(actor => (
              <li key={actor.cast_id} className={style.actorsCard}>
                {actor.profile_path !== null ? (
                  <img
                    className={style.image}
                    src={`${this.baseImageUrl}${this.imageSize}${actor.profile_path}`}
                    alt=""
                  />
                ) : (
                  <img
                    src="https://www.atehno.md/theme/images/no_image.png"
                    width="250"
                    alt=""
                  ></img>
                )}
                <p className={style.actorsName}>{actor.name}</p>
                <p className={style.characterTitle}>Character:</p>
                <p className={style.actorsCharacter}> {actor.character}</p>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default Cast;
