import axios from 'axios';
import {
    CREATE_DOG,
    GET_ALL_DOGS,
     GET_TEMPERAMENTS,
      SEARCH_BY_NAME, 
      SELECTED_ORDER, 
      SELECTED_ORIGIN,
       SELECTED_TEMPERAMENTS,
        ORDER_DOGS, 
        FILTERED_BY_TEMPERAMENT,
         ORIGIN,
         RESET_ALL_FILTERS,
         CURRENT_PAGE,
         DOGS_ORIGIN
} from './actionsTypes'

const endPointDog='http://localhost:3001/dogs'
const endPointTemperament='http://localhost:3001/dogs/temperament'

export const getAllDogs = () => {
    return async dispatch => {
        try {
            const { data } = await axios(endPointDog)
            return dispatch({
                type: GET_ALL_DOGS,
                payload: data
            })
        } catch (error){
            alert(error.message)
        }
    }
}

export const getTemperaments = (temperaments)=>{
    return async dispatch => {
        try {
            const { data } = await axios(`${endPointTemperament}/${temperaments}`)
            
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: data 
            })
            
        } catch(error){
            alert(error.message)
        }
    }
}

export const getDogsByName = search => {
    return async dispatch => {
        try {
            const { data } = await axios(`${endPointDog}/name?name=${search}`)
         
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: data,
            })

        } catch (error){
            alert('No se encontraron razas con ese nombre')
        }
    }
}

export const createDog = (formData)=>{
    return async (dispatch)=>{
        try{
            const { data } = await axios.post('http://localhost:3001/create', formData);
            return dispatch({
                type: CREATE_DOG,
                payload: data
            })
        }catch (error){
            console.error('Error al crear raza de perro')
        }
       
    }
}
export const filterByTemperament = temperaments => {
	return dispatch => {
		return dispatch({
			type: FILTERED_BY_TEMPERAMENT,
			payload: temperaments,
		})
	}
}
export const orderDogs = order => {
   
	return dispatch => {
		return dispatch({
			type: ORDER_DOGS,
			payload: order,
		})
	}
}
export const setSelectedTemperaments = temperaments => {
	return dispatch => {
		return dispatch({
			type: SELECTED_TEMPERAMENTS,
			payload: temperaments,
		})
	}
}

export const dogsFrom = typeOfId => {
	return dispatch => {
		return dispatch({
			type: ORIGIN,
			payload: typeOfId,
		})
	}
}
export const resetAllFilters = () => {
	return dispatch => {
		return dispatch({
			type: RESET_ALL_FILTERS,
			payload: [],
		})
	}
}
export const setCurrentPage = page => {
	return dispatch => {
		return dispatch({
			type: CURRENT_PAGE,
			payload: Number(page),
		})
	}
}

export const dogsOrigin = origin => {
    return async dispatch => {
    return dispatch ({
        type: DOGS_ORIGIN,
        payload: origin
    })
}
}