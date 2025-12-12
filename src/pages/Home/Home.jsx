import React from 'react';
import Hero from '../../components/Hero/Hero';
import AdvertisedTicket from '../../components/AdvertisedTicket/AdvertisedTicket';
import LatestTicket from '../../components/LatestTicket/LatestTicket';

const Home = () => {
    return (
        <div>
            <Hero />
            <AdvertisedTicket />
            <LatestTicket />
        </div>
    );
};

export default Home;