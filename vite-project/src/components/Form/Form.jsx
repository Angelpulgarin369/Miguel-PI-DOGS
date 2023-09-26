import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemperaments } from '../../Redux/action';
import './FormModule.css';

const Form = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperament);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    weight_min: '',
    weight_max: '',
    life_span: '',
    height_min: '',
    height_max: '',
    creator: '',
    temperaments: [],
  });

  const [activeField, setActiveField] = useState(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isFormValid = () => {
    return (
      formData.name &&
      formData.image &&
      formData.weight_min > 0 &&
      formData.weight_max > 0 &&
      formData.life_span > 0 &&
      formData.height_min > 0 &&
      formData.height_max > 0 &&
      formData.temperaments.length > 0
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'weight_min' || name === 'height_min') {
      const min = parseFloat(value);
      const max = parseFloat(formData[`${name.split('_')[0]}_max`]);

      if (min > max) {
        setAlertMessage(`El ${name.split('_')[0]} mínimo no puede ser mayor que el máximo.`);
      } else {
        setAlertMessage('');
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTemperamentChange = (event) => {
    const { name, checked } = event.target;
    const updatedTemp = [...formData.temperaments];

    if (checked) {
      updatedTemp.push(name);
    } else {
      const index = updatedTemp.indexOf(name);

      if (index !== -1) {
        updatedTemp.splice(index, 1);
      }
    }

    setFormData({
      ...formData,
      temperaments: updatedTemp,
    });
  };

  const handleButtonClick = (field) => {
    if (activeField === field) {
      setInputVisible(false);
      setActiveField(null);
    } else {
      setInputVisible(true);
      setActiveField(field);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = {
      name: formData.name,
      image: formData.image,
      weight_max: formData.weight_max,
      weight_min: formData.weight_min,
      life_span: formData.life_span,
      height_max: formData.height_max,
      height_min: formData.height_min,
      creator: formData.creator,
      temperaments: formData.temperaments,
    };

    try {
      await dispatch(createDog(formDataToSend));
      setFormData({
        name: '',
        image: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        height_min: '',
        height_max: '',
        temperaments: [],
      });
    } catch (error) {
      console.error('Error al crear el perro:', error);
    }
  };

  useEffect(() => {
    if (!allTemperaments.length) {
      dispatch(getTemperaments());
    }
  }, []);

  return (
    <div className="form-container">
      <h2 className="form-title">𝑪𝒓𝒆𝒂𝒓 𝑻𝒖 𝒑𝒓𝒐𝒑𝒊𝒐 𝑷𝒆𝒓𝒓𝒐</h2>
      <div className="button-container">
        {['name', 'image', 'weight', 'life_span', 'height', 'temperament'].map((field) => (
          <button
            key={field}
            className={`form-button ${activeField === field ? 'active' : ''}`}
            onClick={() => handleButtonClick(field)}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        {activeField && inputVisible && (
          <div>
            {activeField !== 'temperament' ? (
              <>
                <label className="form-label">{activeField.charAt(0).toUpperCase() + activeField.slice(1)}:</label>
                <input
                  type={activeField === 'name' || activeField === 'image' ? 'text' : 'number'}
                  name={activeField}
                  value={formData[activeField]}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </>
            ) : (
              <>
                <label className="form-label">Temperament:</label>
                <input
                  type="text"
                  name="temperament"
                  value={formData.temperament}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </>
            )}
            {activeField === 'weight' && (
              <>
                <label className="form-label">Peso Mínimo:</label>
                <input
                  type="number"
                  name="weight_min"
                  value={formData.weight_min}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <label className="form-label">Peso Máximo:</label>
                <input
                  type="number"
                  name="weight_max"
                  value={formData.weight_max}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </>
            )}
            {activeField === 'height' && (
              <>
                <label className="form-label">Altura Mínima:</label>
                <input
                  type="number"
                  name="height_min"
                  value={formData.height_min}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <label className="form-label">Altura Máxima:</label>
                <input
                  type="number"
                  name="height_max"
                  value={formData.height_max}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </>
            )}
          </div>
        )}
        {activeField === 'temperament' && inputVisible && (
          <div className="checkbox-container">
            {allTemperaments.map((temp, index) => (
              <div key={index} className="checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name={temp}
                    value={formData.id}
                    checked={formData.temperaments.includes(temp)}
                    onChange={handleTemperamentChange}
                    className="checkbox-input"
                  />
                  {temp}
                </label>
              </div>
            ))}
          </div>
        )}
        {alertMessage && (
          <div className="alert">
            {alertMessage}
            <button onClick={() => setAlertMessage('')}>Cerrar</button>
          </div>
        )}
        {isFormValid() && (
          <button className="form-button" type="submit">
            Crear Raza
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;

