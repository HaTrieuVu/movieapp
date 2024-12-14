import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setBannerData,
  setImageURL,
} from "./store/movieoSlice";

function App() {
  const dispath = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const respone = await axios.get("/trending/all/week");

      dispath(setBannerData(respone.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const respone = await axios.get("/configuration");

      dispath(setImageURL(respone.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();

  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
