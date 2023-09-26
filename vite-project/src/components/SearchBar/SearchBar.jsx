import React, { useState } from 'react';
import { getDogsByName } from '../../Redux/action';
import { useDispatch } from 'react-redux';
import './SearchBarModule.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  };

  const searchDogs = () => {
    dispatch(getDogsByName(search));
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <div className="home-page">
      <div className="search-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={handleSearch}
          />
          {search && (
            <button onClick={clearSearch} className="clear-button">
              ×
            </button>
          )}
        </div>
        <button className="search-button" onClick={searchDogs}>
           Buscar
        </button>

      </div>
    </div>
  );
};

export default SearchBar;



