import { useEffect } from 'react';
import { 
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Checkout from './scenes/checkout/Checkout';
import Confirmation from './scenes/checkout/Confirmation';
import CartMenu from './scenes/global/CartMenu';
import NavBar from './scenes/global/NavBar';
import Home from './scenes/home/Home';
import ItemDetails from './scenes/itemDetails/ItemDetails';
import Footer from "./scenes/global/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;


// Rule of Thumb: Organize Architecture via FEATURES (Pages)
  // Organize via where or what it's doing
      // Ex). NavBar = Will contain the HTML,CSS,JavaScript,React,ReactState
        // Except we do separate the data...

// Components = Folder for shared components -> a component that is being shared across multiple pages, multiple features
// Scenes = Folder contains components that will setup our page layouts
// State = This is where our Redux toolkit and data will be stored 

// This is Dux Pattern.