import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');
  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };
  const handleQuerySubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('enter the queryn');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.Searchbar__header}>
      <form className={s.SearchForm} onSubmit={handleQuerySubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButton__label}>Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          name="query"
          value={query}
          onChange={handleQueryChange}
          // autoComplete="off"
          // autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
