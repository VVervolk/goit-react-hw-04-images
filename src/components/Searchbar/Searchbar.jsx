import { SearchForm, Header, Button, Input } from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <Button type="submit">
          <FaSearch className="icon" />
        </Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
