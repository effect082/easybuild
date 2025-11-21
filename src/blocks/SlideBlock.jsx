import React, { useState, useEffect } from 'react';

const SlideBlock = ({ content, style }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = content.slides || [];
    const interval = content.interval || 3; // Default 3 seconds

    // Auto-advance slides
    useEffect(() => {
        if (slides.length <= 1) return; // Don't auto-advance if only 1 slide

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, interval * 1000);

        return () => clearInterval(timer);
    }, [slides.length, interval, currentIndex]);

    if (slides.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9fafb', ...style }}>
                <p style={{ color: '#888' }}>슬라이드 이미지를 추가해주세요</p>
            </div>
        );
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const currentSlide = slides[currentIndex];
    const imageElement = (
        <img
            src={currentSlide.url}
            alt={`Slide ${currentIndex + 1}`}
            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
    );

    return (
        <div style={{ padding: '10px', ...style }}>
            <div style={{ position: 'relative', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                {/* Image */}
                {currentSlide.link ? (
                    <a href={currentSlide.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                        {imageElement}
                    </a>
                ) : (
                    imageElement
                )}

                {/* Navigation Buttons */}
                {slides.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label="Previous slide"
                        >
                            ‹
                        </button>
                        <button
                            onClick={goToNext}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label="Next slide"
                        >
                            ›
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {slides.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '8px'
                    }}>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: index === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SlideBlock;
