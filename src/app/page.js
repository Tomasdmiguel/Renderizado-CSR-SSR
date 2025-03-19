
//Componentes
import EventHighlighterServer from "@/components/EventHighlighterServer";
import EventHighlighterClient from "@/components/EventHighlighterClient";
import ParkingReservation from "@/components/ParkingReservation";
// import ClientReview from "../components/ClienteReview";
// import EventProx from "../components/EventProx";
// import ParkingApp from "../components/ParkingApp";
// import ParkingServiceSection from "../components/ParkingServiceSection";
// import Partners from "../components/Partners";
// import EventHighlighter from "../components/EventHighlighter";

const pageHome = () => {
  return (
    <>
      <EventHighlighterServer />
      <EventHighlighterClient />
      {/* <ParkingReservation /> */}
      {/* <EventProx />
      <Partners />
      <ParkingServiceSection />
      <ClientReview />
      <ParkingApp /> */}
    </>
  );
};

export default pageHome;
