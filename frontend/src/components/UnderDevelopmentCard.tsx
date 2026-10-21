import React from 'react';

const UnderDevelopmentCard = ({ title = "Under Development", description = "We are currently working on this feature. It will be available soon.", className = "" }) => {
  return (
    <div className={`w-full max-w-md mx-auto mt-20 p-8 rounded-2xl bg-surface border border-border-main text-center shadow-sm ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center text-3xl mb-4">
        <i className="ri-tools-fill" />
      </div>
      <h2 className="text-xl font-bold font-headingA text-text-main mb-2">{title}</h2>
      <p className="text-sm text-text-sec">{description}</p>
    </div>
  );
};

export default UnderDevelopmentCard;
