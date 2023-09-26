export const ascendingOrder = (array, orderId) => {
  
	if (orderId === 'name') {
	  return array.sort((a, b) => {
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	  });
	} else if (orderId === 'weight') {
	  // Verificar si se debe ordenar por peso mínimo o promedio
	  return array.sort((a, b) => {
		if (a.weight && b.weight) {
		  const minA = parseInt(a.weight.imperial.split(/\s*-\s*|\s*–\s*/)[0], 10) || 0;
		  const minB = parseInt(b.weight.imperial.split(/\s*-\s*|\s*–\s*/)[0], 10) || 0;
  
		  // Comprobar si el peso mínimo está disponible para ambos perros
		  if (!isNaN(minA) && !isNaN(minB)) {
			return minA - minB; // Ordenar por peso mínimo
		  }
		}
  
		// Si no se cumple ninguna condición anterior, ordenar por peso promedio
		const getWeightAverage = (dog) => {
		  const minWeight = parseInt(dog.weight_min, 10) || 0;
		  const maxWeight = parseInt(dog.weight_max, 10) || 0;
		  return (minWeight + maxWeight) / 2;
		};
  
		const weightA = getWeightAverage(a);
		const weightB = getWeightAverage(b);
  
		return weightA - weightB;
	  });
	}
  }
  export const descendingOrder = (array, orderId) => {
	console.log(orderId);
	if (orderId === 'name') {
	  return array.sort((a, b) => {
		if (a.name > b.name) return -1; // Invertir el orden de retorno
		if (a.name < b.name) return 1; // Invertir el orden de retorno
		return 0;
	  });
	} else if (orderId === 'weight') {
		const  allDogs = array.map(dog => {
			if(isNaN(dog.id)) {
				return {
					...dog,
					weight:{imperial:`${dog.weight_min} - ${dog.weight_max}`}
				}
			}
			else{
				return dog
			}
		}) 
		return allDogs.sort((a, b) => {
			if (a.weight && b.weight) {
			  const minA = parseInt(a.weight.imperial.split(/\s*-\s*|\s*–\s*/)[0], 10) || 0;
			  const minB = parseInt(b.weight.imperial.split(/\s*-\s*|\s*–\s*/)[0], 10) || 0;
	  
			  // Comprobar si el peso mínimo está disponible para ambos perros
			  if (!isNaN(minA) && !isNaN(minB)) {
				return minB - minA; // Ordenar por peso mínimo
			  }
			}
		  });
		}
	 
  }
  