'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ParkingReservation = () => {
  const scrollRefEvents = useRef(null);
  const scrollRefVenues = useRef(null);
  const [scrollPositionEvents, setScrollPositionEvents] = useState(0);
  const [scrollPositionVenues, setScrollPositionVenues] = useState(0);

  useEffect(() => {
    const scrollContainerEvents = scrollRefEvents.current;
    const scrollContainerVenues = scrollRefVenues.current;
    const cardWidthEvents = scrollContainerEvents?.firstChild?.offsetWidth + 24;
    const cardWidthVenues = scrollContainerVenues?.firstChild?.offsetWidth + 24;
    const maxScrollEvents =
      scrollContainerEvents?.scrollWidth - scrollContainerEvents?.clientWidth;
    const maxScrollVenues =
      scrollContainerVenues?.scrollWidth - scrollContainerVenues?.clientWidth;

    const interval = setInterval(() => {
      // Eventos
      if (scrollContainerEvents) {
        if (scrollPositionEvents >= maxScrollEvents) {
          setScrollPositionEvents(0);
          scrollContainerEvents.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const newPosition = scrollPositionEvents + cardWidthEvents;
          setScrollPositionEvents(newPosition);
          scrollContainerEvents.scrollTo({
            left: newPosition,
            behavior: "smooth",
          });
        }
      }

      // Venues
      if (scrollContainerVenues) {
        if (scrollPositionVenues >= maxScrollVenues) {
          setScrollPositionVenues(0);
          scrollContainerVenues.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const newPosition = scrollPositionVenues + cardWidthVenues;
          setScrollPositionVenues(newPosition);
          scrollContainerVenues.scrollTo({
            left: newPosition,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollPositionEvents, scrollPositionVenues]);

  const handleScrollEvents = (e) => {
    setScrollPositionEvents(e.target.scrollLeft);
  };

  const handleScrollVenues = (e) => {
    setScrollPositionVenues(e.target.scrollLeft);
  };

  const venues = [
    "Movistar Arena",
    "River",
    "Madero BoardWalk",
    "Luna Park",
    "C Complejo Art Media",
    "Campo",
    "Movistar Arena",
    "River",
    "Madero BoardWalk",
    "Luna Park",
    "C Complejo Art Media",
    "Campo",
  ];

  const events = [
    {
      name: "Concierto de Rock en Vivo",
      venue: "Arena de la Ciudad",
      image: "/event1.png",
      date: "15/03/25",
    },
    {
      name: "Festival de Jazz",
      venue: "Teatro Central",
      image: "/event2.png",
      date: "10/04/25",
    },
    {
      name: "Noche de Comedia",
      venue: "Café Teatro",
      image: "/event3.png",
      date: "22/05/25",
    },
    {
      name: "Concierto Sinfónico",
      venue: "Auditorio Nacional",
      image: "/event1.png",
      date: "30/06/25",
    },
  ];

  const eventsExtra = [
    {
      id: 1,
      name: "Concierto de Rock en Vivo",
      venue: "Movistar Arena",
      image: "/event1.png",
      date: "15/03/25",
      distance: "42",
    },
    {
      id: 2,
      name: "Festival de Jazz",
      venue: "Teatro Central",
      image: "/event2.png",
      date: "10/04/25",
      distance: "22",
    },
    {
      id: 3,
      name: "Noche de Comedia",
      venue: "Café Teatro",
      image: "/event3.png",
      date: "22/05/25",
      distance: "92",
    },
    {
      id: 4,
      name: "Concierto Sinfónico",
      venue: "Auditorio Nacional",
      image: "/event1.png",
      date: "30/06/25",
      distance: "62",
    },
  ];

  const parkings = Array(7).fill({
    name: "Estacionamientos",
    venue: "Venue - Ciudad o Zona",
    image: "/parkings.png",
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Panel */}
        <div className="flex-1 bg-[#F5F5F5] lg:w-2/4 w-full border rounded-3xl shadow-sm p-4 lg:p-6">
          <h2 className="text-xl lg:text-2xl font-medium text-gray-800">
            Reservá tu estacionamiento
          </h2>
          <p className="text-gray-500 text-sm">
            Disfrutá de tu evento, sin vueltas
          </p>

          {/* Search Section */}
          <div className="flex flex-col lg:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Explorar venues, shows, artistas"
                className="w-full px-4 py-2.5 rounded-full border border-black pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 19l-3.5-3.5"></path>
                  <circle cx="11" cy="11" r="6"></circle>
                </svg>
              </button>
            </div>
            <button className="px-6 py-2.5 rounded-full border border-black text-sm">
              ¿Cuándo?
            </button>
          </div>

          {/* Venues Scroll */}
          <div
            ref={scrollRefVenues}
            onScroll={handleScrollVenues}
            className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide"
          >
            {venues.map((venue, index) => (
              <button
                key={index}
                className="px-4 py-1.5 rounded-full bg-white border border-gray-200 whitespace-nowrap text-sm shadow-[0px 1px 3px 1px #00000026]"
              >
                {venue}
              </button>
            ))}
          </div>

          {/* Events Scroll */}
          <div
            ref={scrollRefEvents}
            onScroll={handleScrollEvents}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth mt-6 lg:mt-10"
          >
            {events.map((event, index) => (
              <div 
                key={index} 
                className="w-[85vw] lg:w-3/5 lg:min-w-[400px] flex-shrink-0"
              >
                <div className="relative bg-white rounded-2xl border overflow-hidden shadow-lg">
                  <div className="p-4 h-48">
                    <div className="absolute top-4 right-4">
                      <button className="bg-[#C1FF71] text-[#394A8F] font-medium px-6 py-1.5 rounded-full text-sm">
                        Reservar
                      </button>
                    </div>
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={100}
                      height={20}
                      className="h-20 rounded-xl object-cover"
                    />
                    <div className="mt-3">
                      <h3 className="text-xl lg:text-2xl font-semibold font-urbanist text-[#30364C]">
                        {event.name}
                      </h3>
                      <div className="flex justify-between items-end mt-1 font-metropolis">
                        <p className="text-base lg:text-lg text-[#30364C]">{event.venue}</p>
                        <p className="text-base lg:text-lg text-[#30364C]">{event.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extra Results Section */}
          <div className="mt-8">
            <h2 className="text-xl text-[#30364C] font-urbanist font-semibold mb-4">
              Más resultados
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventsExtra.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 bg-white p-2 rounded-lg border"
                  >
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={62}
                      height={72}
                      className=" h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col">
                        <h3 className="text-base font-urbanist text-[#30364C] font-semibold">
                          {event.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-[#30364C] font-metropolis">
                            {event.venue}
                          </p>
                          <p className="text-xs text-[#30364C] font-metropolis">
                            {event.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Few Places Left Section */}
            <div className="mt-6">
              <h3 className="text-xl text-[#30364C] font-urbanist font-semibold mb-3">
                Quedan pocos lugares
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventsExtra.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-2 bg-white p-2 rounded-lg border"
                  >
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={60}
                      height={100}
                      className=" object-cover rounded"
                    />
                    <div className="flex font-semibold items-center text-sm text-[#30364C] font-urbanist">
                      <span>{event.distance} km</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (Estacionamientos) - Hidden on mobile */}
        <div className="hidden lg:block w-[300px] bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-xl font-medium text-gray-800">
            Estacionamientos
          </h2>
          <p className="text-sm text-gray-500">
            Podés buscar estacionamientos por barrio
          </p>
          <div className="mt-4 mb-6">
            <Image src="/filtro.png" alt="Filtros" width={70} height={70} />
          </div>
          <div className="h-[600px] overflow-y-auto space-y-4 border-[#9599AA66] shadow-[0px_4px_4px_0px_#00000040] p-2 rounded-xl">
            {parkings.map((parking, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <Image
                  src={parking.image}
                  alt={parking.name}
                  width={52}
                  height={52}
                  className="object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-sm text-gray-800">
                    {index === 0 ? "Camargo" : parking.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {index === 0
                      ? "Movistar Arena - Villa Crespo"
                      : parking.venue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingReservation;