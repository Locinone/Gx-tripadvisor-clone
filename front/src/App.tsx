import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
//import Home from './component/Home';
import AttractionList from './component/AttractionList.tsx';
import AttractionDetail from './component/AttractionDetail.tsx';
import SearchPage from './component/SearchPage.tsx';
import AttractionCard from './component/AttractionCard.tsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />*/}
        <Route
          path="/attraction/test"
          element={
            <AttractionCard
              location_id="187147"
              name="Eiffel Tower"
              description="The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France."
              category="Landmark"
              street1="Champ de Mars"
              street2="5 Avenue Anatole France"
              city="Paris"
              state="Île-de-France"
              country="France"
              postalcode="75007"
              address_string="Champ de Mars, 5 Avenue Anatole France, 75007 Paris, Île-de-France, France"
              price_level={3}
              num_reviews={12345}
              rating={4.8}
              image_url="https://cultureua.com/wp-content/uploads/2020/03/5e6a00e22083f.png"
              contactInfo="Contact Info"
              geoInfo="Geo Info"
              openingHours="9 AM to 11 PM"
              cuisineType="French"
              hotelStyle="Luxury"
              groups={["Tourist Attraction", "Historical Site"]}
              tripAdvisorRating={4.8}
              awards={["Best Landmark", "Top Attraction"]}
              similarSuggestions={["Louvre Museum", "Notre-Dame Cathedral"]}
            />
          }
        />
        <Route path="/attractions" element={<AttractionList />} />
        <Route path="/attraction/:location_id" element={<AttractionDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

