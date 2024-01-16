import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const sliderRef = useRef();
  // useRef is a hook in React that provides a way to create a reference to a React element (or a value) and persist it across renders. It's a tool for accessing and interacting with the DOM directly or holding a mutable value that doesn't trigger a re-render when it changes.


  const slideLeft=()=>{
    var slider=document.getElementById(`slider-${title}`);
    slider.scrollLeft = slider.scrollLeft - slider.offsetWidth

  }
//   This expression calculates the new scroll position for the slider element when scrolling to the left or right.
//  It subtracts/adds the width of the element (slider.offsetWidth) from the current scroll position (slider.scrollLeft), effectively moving the scroll position to the left/right respectively.

  const slideRight=()=>{
    var slider=document.getElementById(`slider-${title}`);
    slider.scrollLeft = slider.scrollLeft + slider.offsetWidth 
  }
  const handleScroll = () => {
    const slider = sliderRef.current;
    setShowLeftArrow(slider.scrollLeft > 0);
    setShowRightArrow(
      slider.scrollLeft < slider.scrollWidth - slider.offsetWidth
    );
    console.log(slider.scrollLeft)
    console.log(slider.scrollWidth)
    console.log(slider.offsetWidth)
    
  };

  
  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchUrl]);

  useEffect(() => {
    const slider = sliderRef.current;
    slider.addEventListener("scroll", handleScroll);
    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  return (
    <>
      <h2 className="text-white font-bold md:text-2xl p-4 ml-6 pl-16">
        {title}
      </h2>
      <div className="relative justify-center flex items-center group">
        {showLeftArrow && (
          <IoIosArrowBack
            className="absolute left-10 text-gray-200 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
            onClick={slideLeft}
          />
        )}
        <div ref={sliderRef}
          id={`slider-${title}`}
          className="w-[1200px] h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {/* The map function is used here to iterate through each item in the movies array, and for each item, it generates a set of JSX elements representing a movie card with an image, a hidden overlay, and a title displayed on hover. The key prop is important for React to efficiently update and re-render the components as the list changes. */}
          {movies.map((item) => (
            <Movie key={item.id} item={item} />
          ))}
        </div>
        {showRightArrow && (
          <IoIosArrowForward
            className="absolute right-10 text-gray-200 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
            onClick={slideRight}
          />
        )}
      </div>
    </>
  );
};

export default Row;
