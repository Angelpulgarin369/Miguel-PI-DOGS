import React, { useState } from 'react';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import './HomeModule.css';
import {
  filterByTemperament,
  orderDogs,
  dogsOrigin,
  setSelectedTemperaments,
  resetAllFilters,
} from '../../Redux/action';

function HomePage() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperament);

  const [selectedTemperament, setSelectedTemperament] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');

  const handleTemperamentChange = (value) => {
    dispatch(setSelectedTemperaments([value]));
    setSelectedTemperament(value);
    dispatch(filterByTemperament([value]));
  };

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
    dispatch(orderDogs(value));
  };

  const filterOrigin = (e) => {
    const { value } = e.target;
    dispatch(dogsOrigin(value));
    setSelectedOrigin(value);
  };

  const handleResetFilters = () => {
    dispatch(resetAllFilters());
    setSelectedTemperament('');
    setSelectedOrder('');
    setSelectedOrigin('');
  };

  return (
    <div className="home-container">
      <h1 className="header">☆꧁༒Busqueda de Razas de Perros༒꧂☆</h1>

      <SearchBar />

      <div className="select-container">
        <label className="select-label">𝓢𝓮𝓵𝓮𝓬𝓬𝓲𝓸𝓷𝓪 𝓾𝓷 𝓽𝓮𝓶𝓹𝓮𝓻𝓪𝓶𝓮𝓷𝓽𝓸:</label>
        <select
          className="select"
          onChange={(e) => handleTemperamentChange(e.target.value)}
          value={selectedTemperament}
        >
          <option value="">𝐓𝐨𝐝𝐨𝐬 𝐥𝐨𝐬 𝐭𝐞𝐦𝐩𝐞𝐫𝐚𝐦𝐞𝐧𝐭𝐨𝐬</option>
          {temperaments.map((temperament) => (
            <option key={temperament} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label className="select-label">𝓞𝓻𝓭𝓮𝓷𝓪𝓻 𝓹𝓸𝓻:</label>
        <select
          className="select"
          onChange={(e) => handleOrderChange(e.target.value)}
          value={selectedOrder}
        >
          <option value="">𝐒𝐢𝐧 𝐨𝐫𝐝𝐞𝐧𝐚𝐫</option>
          <option value="A - Z">Nombre (A - Z)</option>
          <option value="Z - A">Nombre (Z - A)</option>
          <option value="Ascending Weight">Peso ascendente</option>
          <option value="Descending Weight">Peso descendente</option>
        </select>
      </div>

      <div className="select-container">
        <label className="select-label">𝓞𝓻𝓲𝓰𝓮𝓷:</label>
        <select
          className="select"
          name="Origin"
          onChange={filterOrigin}
          value={selectedOrigin}
        >
          <option value="">𝐓𝐨𝐝𝐨𝐬 𝐥𝐨𝐬 𝐨𝐫í𝐠𝐞𝐧𝐞𝐬</option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>
      </div>

      <button className="reset-button" onClick={handleResetFilters}>
      𝕽𝖊𝖘𝖙𝖆𝖇𝖑𝖊𝖈𝖊𝖗 𝕱𝖎𝖑𝖙𝖗𝖔𝖘
      </button>

      <div className="cards-container">
        <Cards />
      </div>
    </div>
  );
}

export default HomePage;
