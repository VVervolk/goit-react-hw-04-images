import { useState } from 'react';
import { Container } from './App.styled';
import ImageGallery from 'components/ImageGallery';

import Searchbar from 'components/Searchbar';

export default function App() {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const userRequest = e.target.elements[1].value;

    if (value === userRequest) {
      return;
    }

    setValue(userRequest);
    e.target.reset();
  }

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      <ImageGallery request={value}></ImageGallery>
    </Container>
  );
}
