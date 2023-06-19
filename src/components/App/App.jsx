import React, { Component } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const userRequest = e.target.elements[1].value;

    if (this.state.value === userRequest) {
      return;
    }

    this.setState({
      value: userRequest,
    });
    e.target.reset();
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        <ImageGallery request={this.state.value}></ImageGallery>
      </Container>
    );
  }
}
