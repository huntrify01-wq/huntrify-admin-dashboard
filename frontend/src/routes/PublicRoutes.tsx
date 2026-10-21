import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComponentsPage from '../pages/components';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="flex flex-col items-center justify-center p-12 text-center min-h-[calc(100vh-4rem)]">
          <i className="ri-home-4-fill text-5xl text-primary mb-4" />
          <h2 className="text-3xl font-semibold font-headingA">Welcome to Huntrify</h2>
          <p className="mt-3 text-text-sec">Select a page from the sidebar to get started.</p>
        </div>
      } />
      <Route path="/components" element={<ComponentsPage />} />
    </Routes>
  );
};
