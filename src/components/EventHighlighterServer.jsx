import { getEventHighligther } from "@/services/ServiceEventHighligther";
import EventHighlighterCarousel from "./EventHighlighterCarousel";

const EventHighlighterServer = async () => {
  const characters = await getEventHighligther();

  return (
    <div>
      {/* Sección de documentación visible para los usuarios */}
      <section className="my-8 p-4 bg-gray-100 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-[#30364C]">
          Renderizado SSR en Next.js
        </h2>
        <p>
          El renderizado en el servidor (SSR) permite que las páginas se generen dinámicamente en el servidor antes de enviarlas al cliente. Esto significa que los datos se obtienen y procesan en el servidor antes de que el usuario vea la página.
        </p>
        
        <h3 className="font-semibold text-xl mt-4">Ventajas del SSR:</h3>
        <ul className="list-disc pl-6">
          <li><strong>Mejor SEO:</strong> La página ya está renderizada, lo que facilita la indexación por los motores de búsqueda.</li>
          <li><strong>Carga inicial más rápida:</strong> El usuario recibe la página con los datos ya procesados.</li>
          <li><strong>Datos actualizados en cada solicitud:</strong> Los datos se obtienen dinámicamente cada vez que se carga la página.</li>
          <li><strong>Menor carga en el cliente:</strong> El trabajo pesado se realiza en el servidor, no en el navegador.</li>
        </ul>
        
        <h3 className="font-semibold text-xl mt-4">Desventajas del SSR:</h3>
        <ul className="list-disc pl-6">
          <li><strong>Mayor tiempo de respuesta:</strong> Cada solicitud requiere que el servidor genere la página, lo que puede ser más lento que el renderizado estático.</li>
          <li><strong>Mayor carga en el servidor:</strong> Si hay muchas peticiones concurrentes, el servidor puede sobrecargarse.</li>
          <li><strong>No ideal para interactividad:</strong> Si la página necesita mucha interacción en el cliente, el CSR puede ser más adecuado.</li>
        </ul>
        
        <h3 className="font-semibold text-xl mt-4">¿Cuándo usar SSR?</h3>
        <p>
          SSR es ideal cuando necesitas SEO y datos que cambian dinámicamente en cada solicitud, como contenido personalizado o datos en tiempo real.
        </p>
      </section>

      {/* Renderizado del componente principal */}
      <EventHighlighterCarousel title={'Renderizado SSR'} characters={characters} />
    </div>
  );
};

export default EventHighlighterServer;
