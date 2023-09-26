import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './DetailModule.css'
const Detail = () => {
  const [dog, setDog] = useState({})
	const [error, setError] = useState(false)
  const { id } = useParams();
  // console.log(id)
  // const [dogData, setDogData] = useState(null);
  
  const request = async () => {
		try {
			const { data } = await axios(`http://localhost:3001/dogs/${id}`)
			setDog(data)
		} catch (error) {
			setError(true)
			alert('No breed matches the searched id')
		}
	}
  useEffect(() => {
		request()
	}, [])
  const {
		name,
    reference_image_id,
		weight,
		height,
		bred_for,
		breed_group,
		life_span,
		temperament,
		origin,
    image,
    weight_max,
    weight_min,
    Temperamens
    
	} = dog


  return (
    <div className="detail-container">
    {dog ? (
      <>
        
        {isNaN(id)? <img src={image} alt={"cargando"}/> :
        <img src={`https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`} alt={name} />
        }
        <h2>ID: {id}</h2>
        <h2 className='data-label'>Nombre:</h2>
        <p className='data-label'>{name}</p>
        {breed_group && (
          <p className='data-label'>Grupo De Raza: {breed_group}</p>
        )}
         {life_span && (
          <p className='data-label'>Esperanza de Vida: {life_span}</p>
        )}
        {bred_for && (
          <p className='data-label'>Criado Para: {bred_for}</p>
        )}
         {origin && (
          <p className='data-label'>Origen: {origin}</p>
        )
        }
        
        {height && (
          <>
            <p className='data-label'>Altura Imperial: {height.imperial} inches</p>
            <p className='data-label'>Altura Métrica: {height.metric} cm</p>
          </>
        )}
        {weight && (
          <>
            <p className='data-label'>Peso Imperial: {weight.imperial}</p>
            <p className='data-label'>Peso Métrico: {weight.metric}</p>
          </>
        )}
        {weight_min && (
          <p className='data-label'>Peso Minimo: {weight_min}</p>
        )}
        {weight_max && (
          <p className='data-label'>Peso Maximo: {weight_max}</p>
        )}
        {temperament && (
          <p className='data-label'>Temperamento: {temperament}</p>
        )}
      
      </>
    ) : (
      <p>Cargando datos del perro...</p>
    )}
  </div>
  )
}
export default Detail