"use client";

import { useEffect, useState } from "react";
import EventHighlighterCarousel from "./EventHighlighterCarousel";

const EventHighlighterClient = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
          {/* Renderizado del componente principal */}
      <EventHighlighterCarousel
        title={"Renderizado CSR"}
        characters={characters}
      />
      {/* Sección de documentación visible para los usuarios */}
      <section className="my-8 p-4 bg-gray-100 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-[#30364C]">
          Renderizado CSR en Next.js
        </h2>
        <p>
          El renderizado en el cliente (CSR) es un enfoque en el que los datos
          se obtienen y procesan en el navegador después de que la página se ha
          cargado. El proceso se realiza totalmente en el lado del cliente, lo
          que significa que la página llega al cliente sin contenido dinámico.
        </p>

        <h3 className="font-semibold text-xl mt-4">Ventajas del CSR:</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Interactividad en tiempo real:</strong> El contenido se
            puede actualizar de manera eficiente sin tener que hacer una nueva
            solicitud al servidor.
          </li>
          <li>
            <strong>Reducción de la carga en el servidor:</strong> Al realizar
            todo el procesamiento en el cliente, el servidor no necesita hacer
            trabajo extra después de la carga inicial.
          </li>
          <li>
            <strong>Experiencia fluida:</strong> Al ser completamente
            interactivo, se puede generar una experiencia de usuario más
            dinámica y rápida tras la carga inicial.
          </li>
        </ul>

        <h3 className="font-semibold text-xl mt-4">Desventajas del CSR:</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>SEO limitado:</strong> Los motores de búsqueda no pueden
            indexar el contenido dinámico, lo que puede afectar la visibilidad
            en buscadores.
          </li>
          <li>
            <strong>Carga inicial más lenta:</strong> Aunque después la
            interacción es rápida, la primera carga puede ser más lenta debido a
            la obtención de datos en el cliente.
          </li>
          <li>
            <strong>Dependencia de JavaScript:</strong> Si el usuario tiene
            JavaScript deshabilitado, la página no funcionará correctamente.
          </li>
        </ul>

        <h3 className="font-semibold text-xl mt-4">¿Cuándo usar CSR?</h3>
        <p>
          CSR es ideal cuando necesitas una **interactividad rápida** y
          **dinámica**, y no es tan crítico para el SEO. Es útil en aplicaciones
          altamente interactivas como redes sociales, paneles de control, o
          cualquier sitio donde el contenido cambia frecuentemente.
        </p>
      </section>

     
      <div>
        <section className="my-8 p-4 bg-gray-100 rounded-xl">
          <h3 className="text-xl font-semibold text-[#30364C]">
            ¿Cuándo usar CSR?
          </h3>
          <p>
            El renderizado en el cliente (CSR) es ideal para situaciones en las
            que el contenido se debe actualizar dinámicamente sin necesidad de
            hacer una nueva solicitud al servidor. Algunos ejemplos son:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Aplicaciones de redes sociales:</strong> Donde el
              contenido se actualiza constantemente y la interactividad del
              usuario es esencial (comentarios, likes, publicaciones, etc.).
            </li>
            <li>
              <strong>Paneles de control interactivos:</strong> En los que el
              usuario necesita ver información en tiempo real y se espera que la
              página cambie con frecuencia.
            </li>
            <li>
              <strong>Plataformas de comercio electrónico:</strong> Cuando el
              contenido cambia dinámicamente basado en las interacciones del
              usuario, como filtrar productos o ver resultados en tiempo real.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#30364C] mt-6">
            ¿Cuándo no usar CSR?
          </h3>
          <p>
            Aunque CSR tiene muchas ventajas, no es adecuado para todas las
            situaciones. No es recomendable usar CSR en:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Páginas donde el SEO es crítico:</strong> Si el contenido
              no es indexado por los motores de búsqueda, como en sitios donde
              la visibilidad en Google es esencial.
            </li>
            <li>
              <strong>
                Aplicaciones donde el contenido debe ser accesible de inmediato:
              </strong>{" "}
              Como en sitios web de noticias o blogs donde la carga rápida del
              contenido es importante.
            </li>
            <li>
              <strong>
                Aplicaciones donde el primer renderizado debe ser inmediato:
              </strong>{" "}
              Si se necesita un contenido estático que no dependa de la
              interacción del usuario, como páginas de destino o blogs.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default EventHighlighterClient;
