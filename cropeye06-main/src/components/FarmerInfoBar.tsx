import React from 'react';
import { useFarmerProfile } from '../hooks/useFarmerProfile';
import './FarmerInfoBar.css';

const FarmerInfoBar: React.FC = () => {
  const { profile, getFarmerName, getTotalPlots } = useFarmerProfile();

  // Format current date
  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return today.toLocaleDateString('en-US', options);
  };

  // Get farmer name
  const farmerName = profile ? getFarmerName() : 'Loading...';
  
  // Get total plots count - use agricultural_summary first, fallback to plots array length
  const totalPlots = profile 
    ? (getTotalPlots() || profile.plots?.length || 0)
    : 0;

  // Don't render if no profile data
  if (!profile) {
    return null;
  }

  return (
    <div className="farmer-info-bar">
      <div className="farmer-info-container">
        {/* Left: Farmer Name */}
        <div className="farmer-info-section farmer-info-left">
          <span className="farmer-name">{farmerName}</span>
        </div>

        {/* Center: Current Date */}
        <div className="farmer-info-section farmer-info-center">
          <span className="farmer-date">{getCurrentDate()}</span>
        </div>

        {/* Right: Total Plots */}
        <div className="farmer-info-section farmer-info-right">
          <span className="farmer-plots">Total Plots: {totalPlots}</span>
        </div>
      </div>
    </div>
  );
};

export default FarmerInfoBar;
