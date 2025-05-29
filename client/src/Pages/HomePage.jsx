import React from 'react';
import Sidbar from '../Components/Sidbar';

export default function HomePage() {
  return (
    <div className="min-vh-100 bg-light">
      <div className="d-flex justify-content-center pt-5 px-3">
        <div className="bg-white rounded shadow w-100" style={{ maxWidth: '1140px', height: 'calc(100vh - 8rem)' }}>
          <Sidbar />
        </div>
      </div>
    </div>
  );
}
