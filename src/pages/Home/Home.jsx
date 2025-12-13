import React from 'react';
import Hero from '../../components/Hero/Hero';
import AdvertisedTicket from '../../components/AdvertisedTicket/AdvertisedTicket';
import LatestTicket from '../../components/LatestTicket/LatestTicket';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import PopularRoutes from '../../components/PopularRoutes/PopularRoutes';

const Home = () => {
    return (
        <div>
            <Hero />
            <AdvertisedTicket />
            <LatestTicket />
            <PopularRoutes />
            <WhyChooseUs />
        </div>
    );
};

export default Home;