import { useState, useEffect } from 'react';
import './carousel.css';

const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const useFetch = (url) => {
    const [slides, setSlides] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await fetch(url);
            const dataJ = await data.json();
            setSlides(dataJ);
        }
        fetchData();
    }, []);

    return slides;
};

function Carousel({ slideCount, infinite }) {

    const slides = useFetch(`https://kikzkol8q7.execute-api.ap-south-1.amazonaws.com/Prod/api/carousel?slides=${slideCount}`);

    // state systems
    const [currentIndex, setCurrentIndex] = useState(0);
    const [title, setTitle] = useState(slides[0]?.title);
    const [subTitle, setSubTitleTitle] = useState(slides[0]?.subTitle);
    const [arrowVisibility, setArrowVisibility] = useState({
        showNextArrow: false,
        showPreviousArrow: false,
    });
    
    //when initial load check the inifinite value and generate logic for arrow visibility and set default values for title and subtitle.
    useEffect(() => {
        setArrowVisibility({
            showNextArrow: (slides.length > 1),
            showPreviousArrow: (slides.length > 1) && (infinite || currentIndex !== 0),
        });
        setTitle(slides[0]?.title);
        setSubTitleTitle(slides[0]?.subTitle);
    }, [slides]);


    // handle previous image
    const handlePrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        if(!infinite) {
            const shouldShowNextArrow = newIndex < (slides.length - 1);
            const shouldHidePrevArrow = newIndex === 0;
            setArrowVisibility({
                showNextArrow: shouldShowNextArrow,
                showPreviousArrow: !shouldHidePrevArrow,
            });
        }
        setCurrentIndex(newIndex);
        setTitle(slides[newIndex]?.title);
        setSubTitleTitle(slides[newIndex]?.subTitle);

    };

    // handle next image
    const handleNext = () => {
        const isLastSlide = currentIndex === (slides.length - 1);
        let newIndex = isLastSlide ? 0 : currentIndex + 1;
        if(!infinite) {
            const shouldHideNextArrow = newIndex === (slides.length - 1);
            const shouldShowPrevArrow = newIndex > 0;
            setArrowVisibility({
                showNextArrow: !shouldHideNextArrow,
                showPreviousArrow: shouldShowPrevArrow,
            });
        }
        setCurrentIndex(newIndex);
        setTitle(slides[newIndex]?.title);
        setSubTitleTitle(slides[newIndex]?.subTitle);
    };

    // add backgrond image property
    const slideStylesWidthBackground = {
        ...slideStyles,
        backgroundImage: `url(${slides[currentIndex]?.image})`,
    };

    return (
        <>
            <div className='sliderStyles row-gap'>
                <div>
                    <div className={`leftArrowStyles ${arrowVisibility.showPreviousArrow ? ' visible':' hidden'}`} onClick={handlePrevious}>❰</div>
                    <div className={`rightArrowStyles ${arrowVisibility.showNextArrow ? ' visible':' hidden'}`} onClick={handleNext}>❱</div>
                </div>

                <div style={slideStylesWidthBackground}></div>
                <div>
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex}>
                                <span className="title">{title}</span>
                                <span className="subtitle">{subTitle}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Carousel;