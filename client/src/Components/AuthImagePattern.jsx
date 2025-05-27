import React from 'react';

export default function AuthImagePattern({ title, subtitle }) {
    return (
        <div className="d-none d-lg-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="text-center" style={{ maxWidth: '20rem' }}>
                {/* Grid pattern */}
                <div className="d-grid gap-2 mb-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`rounded bg-primary bg-opacity-10 ratio ratio-1x1 ${i % 2 === 0 ? 'placeholder-glow' : ''}`}
                        ></div>
                    ))}
                </div>
                {/* Text */}
                <h2 className="h5 fw-semibold mb-2">{title}</h2>
                <p className="small">{subtitle}</p>
            </div>
        </div>
    );
}
