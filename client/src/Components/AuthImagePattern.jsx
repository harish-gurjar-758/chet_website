import React from 'react'

export default function AuthImagePattern({ title, subtitle }) {
    return (
        <div>
            <div>
                <div>
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-2xl bg-primary/10 ${
                                i % 2 === 0 ? "animate-pulse" : ""
                            }`}
                        />
                    ))}
                </div>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}
