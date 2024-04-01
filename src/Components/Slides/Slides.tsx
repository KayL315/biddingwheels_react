import "./Slides.css";
import { useState } from "react";

export interface SlidesProps {
    slideList: { url: string; caption: string }[];
}

export const Slides = (props: SlidesProps) => {
    const { slideList } = props;
    const [slideIndex, setSlideIndex] = useState(0);

    const nextSlide = () => {
        setSlideIndex((slideIndex + 1) % slideList.length);
    };

    const prevSlide = () => {
        setSlideIndex((slideIndex - 1 + slideList.length) % slideList.length);
    };

    const currentSlide = (n: number) => {
        setSlideIndex(n);
    };

    return (
        <>
            <div className="slideshow-container">
                <div className="mySlides slide-active slide-fade">
                    <img
                        src={slideList[slideIndex].url}
                        style={{
                            width: "100vw",
                            height: "36vh",
                            maxHeight: "300px",
                        }}
                        alt="slide-img"
                    />
                    <div className="slide-text">
                        {slideList[slideIndex].caption}
                    </div>
                </div>

                <div className="slide-prev" onClick={prevSlide}>
                    &#10094;
                </div>
                <div className="slide-next" onClick={nextSlide}>
                    &#10095;
                </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "4px" }}>
                {slideList.map((slide, index) => {
                    return (
                        <span
                            id={`slide-dot-${index}`}
                            className="slide-dot"
                            onClick={() => currentSlide(index)}
                        ></span>
                    );
                })}
            </div>
        </>
    );
};
