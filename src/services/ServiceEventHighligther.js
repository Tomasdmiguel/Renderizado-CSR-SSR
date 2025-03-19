export const getEventHighligther = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character', {
        headers: {
          'Cache-Control': 'no-cache',  
        }
      });
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      if (typeof window !== 'undefined') {
        alert('Error al obtener los datos');
      }
      console.error('Error al obtener los datos:', error);
      return [];
    }
  };
  