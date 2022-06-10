import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';

import { PostJobOffer, AspirantProfile, CompanyProfile, AspirantFeed } from '../views';
import AspirantSearch from '../views/AspirantSearch'

const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/post-job-offer"
      element={(
        <>
          <Navbar />
          <PostJobOffer />
        </>
      )}
    />
    <Route
      path="/profile/aspirant/:id"
      element={(
        <>
          <Navbar />
          <AspirantProfile />
        </>
      )}
    />
    <Route
      path="/profile/company/:id"
      element={(
        <>
          <Navbar />
          <CompanyProfile />
        </>
      )}
    />
    <Route
      path='/aspirant-search'
      element={(
        <>
          <Navbar />
          <AspirantSearch />
        </>
      )}
    />
    <Route
      path='/aspirant-feed'
      element={(
        <>
          <Navbar />
          <AspirantFeed />
        </>
      )}
    />
  </Routes >
  
);

export default PrivateRoutes;
