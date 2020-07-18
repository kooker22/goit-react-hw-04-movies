import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Form/Form.module.css';

class SearchForm extends Component {
  static propTypes = {
    query: PropTypes.string,
  };
  state = {
    query: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);

    this.formReset();
  };

  formReset = () => {
    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={style.form}>
          <input
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}
export default SearchForm;
