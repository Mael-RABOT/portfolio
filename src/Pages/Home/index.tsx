import React from 'react';
import Hero from './Hero';
import Tracks from './Tracks';
import LucySpotlight from './LucySpotlight';
import Skills from './Skills';
import About from './About';
import ContactCta from './ContactCta';
import './Home.css';

const Home: React.FC = () => (
  <>
    <Hero />
    <Tracks />
    <LucySpotlight />
    <Skills />
    <About />
    <ContactCta />
  </>
);

export default Home;
