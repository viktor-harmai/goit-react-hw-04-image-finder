import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  HeaderSearchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

import { FcSearch } from 'react-icons/fc';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    if (this.state.searchQuery.trim() === '') {
      return toast.warn('Field cannot be empty!');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  handlSearchChange = e => {
    const { name, value } = e.currentTarget;
    // console.log(name);
    // console.log(value);

    this.setState({ [name]: value.toLowerCase() });
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const { handleSubmit, handlSearchChange } = this;
    const { searchQuery } = this.state;
    return (
      <HeaderSearchbar>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormBtn type="submit">
            <FcSearch size={20} />
          </SearchFormBtn>

          <SearchFormInput
            value={searchQuery}
            onChange={handlSearchChange}
            type="text"
            name="searchQuery"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </HeaderSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
