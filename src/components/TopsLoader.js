import React from 'react';
import ContentLoader from 'react-content-loader';

const TopsLoader = props => {
  return (
    <ContentLoader
      speed={2}
      width={312}
      height={376}
      viewBox="0 0 312 376"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="62" cy="36" r="20" />
      <rect x="92" y="22" rx="5" ry="5" width="198" height="10" />
      <rect x="92" y="44" rx="5" ry="5" width="150" height="10" />
      <circle cx="62" cy="108" r="20" />
      <rect x="92" y="94" rx="5" ry="5" width="198" height="10" />
      <rect x="92" y="116" rx="5" ry="5" width="150" height="10" />
      <circle cx="62" cy="180" r="20" />
      <rect x="92" y="166" rx="5" ry="5" width="198" height="10" />
      <rect x="92" y="188" rx="5" ry="5" width="150" height="10" />
      <circle cx="62" cy="252" r="20" />
      <rect x="92" y="238" rx="5" ry="5" width="198" height="10" />
      <rect x="92" y="260" rx="5" ry="5" width="150" height="10" />
      <circle cx="62" cy="324" r="20" />
      <rect x="92" y="310" rx="5" ry="5" width="198" height="10" />
      <rect x="92" y="332" rx="5" ry="5" width="150" height="10" />
    </ContentLoader>
  );
};

export default TopsLoader;
