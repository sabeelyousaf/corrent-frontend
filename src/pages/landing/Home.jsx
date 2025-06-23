import React, { useEffect, useState } from 'react';
import Listings from './Listings';
import LatestRealEstate from './LatestRealEstate';
import Sellers from './Sellers';
import FeaturedRealEstate from './FeaturedRealEstate';
import TrustMarquee from './TrustMarquee';
import HeroSection from './HeroSection';
import { countryApi } from '../../api/country';

const Home = () => {

  const [countries, setCountries] = useState([]);
  const fetchCountries = async () => {
    try {
      const res = await countryApi.list();
      setCountries(res?.countries || []);
      console.log(res?.countries, 'Fetched countries');
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <main className="">
      <HeroSection countries={countries} />
      <Listings countries={countries} />
      <LatestRealEstate />
      <Sellers />
      <FeaturedRealEstate />
      <TrustMarquee />
    </main>
  );
};

export default Home;
