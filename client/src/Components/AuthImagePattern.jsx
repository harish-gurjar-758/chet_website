import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="d-none d-lg-flex align-items-center justify-content-center bg-light py-5 px-4" style={{ minHeight: '100vh' }}>
      <div className="text-center" style={{ maxWidth: '24rem' }}>
        {/* Grid pattern */}
        <div
          className="d-grid gap-3 mb-4"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`rounded-4 bg-primary bg-opacity-10 ratio ratio-1x1 ${
                i % 2 === 0 ? 'placeholder-glow' : ''
              }`}
            ></div>
          ))}
        </div>

        {/* Text */}
        <h2 className="h4 fw-bold mb-3">{title}</h2>
        <p className="text-muted">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
