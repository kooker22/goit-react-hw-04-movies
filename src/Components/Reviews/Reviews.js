import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import style from './Review.module.css';

class Reviews extends Component {
  static propsTypes = {
    revews: PropTypes.array,
  };
  state = {
    reviews: [],
    noReview: 'We dont have any reviews for this movie',
  };
  componentDidMount() {
    Axios.get(
      `https://api.themoviedb.org/3/movie/${this.props.movieId}/reviews?api_key=1e5ce310b13e54a49c5d34c28a1fb385&language=en-US&page=1`,
    ).then(response => this.setState({ reviews: response.data.results }));
  }
  render() {
    const { reviews, noReview } = this.state;
    return (
      <>
        {reviews === [] ? (
          <p>{noReview}</p>
        ) : (
          <ul className={style.review}>
            {reviews.map(review => (
              <li key={review.id}>
                <h2>
                  Author:{' '}
                  <span className={style.reviewAuthor}>{review.author}</span>
                </h2>
                <p className={style.reviewContent}>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Reviews;
