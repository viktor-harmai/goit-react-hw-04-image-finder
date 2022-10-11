import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from 'components/Searchbar/Searchbar';
import { Container } from 'components/App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  componentDidMount() {
    // console.log('Mount');
  }

  handleSearchbarSubmit = searchQuery => {
    console.log(searchQuery);
    this.setState({ searchQuery });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />

        <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      </Container>
    );
  }
}
