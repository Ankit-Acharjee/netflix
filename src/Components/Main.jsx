// import React from 'react'
import axios from "axios"; //
import requests from "../Requests";
import { useState, useEffect } from "react";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * 20)]; //2. here math.floor is used because the array ranges from 0-19 so it will round off the result to the below digit.

  //1. useEffect is used to manage the lifecycle of a component by executing code after the component has rendered. The useEffect hook takes a function as its argument, and this function is executed after the component has been rendered. It can also take a dependency array to specify when the effect should be re-run based on changes in state or props.

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results); //This is a Promise handler that gets executed when the Axios request is successful. It takes the response as an argument, which contains data sent by the server.
    });
  }, []); // [] denotes an empty array dependency which means it that the useEffect won't re-run when any state or props change.
  console.log(movie);

  const truncateString =(str,num)=>{
    if(str?.length >num){
      return str.slice(0,num) + '...'
    }
    else{
      return str;
    }
  }
  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full">
        {/* <div className="w-full h-[600px] absolute bg-gradient-to-r from-[#03071E]"></div> */}
        <div className="w-full h-[600px] absolute bg-gradient-to-r from-[#03071E]"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        {/* Here, movie?.title ensures that if movie is null or undefined, the code does not throw an error when trying to access the title property. Instead, the alt attribute will be set to undefined, which is generally safer than causing an error in the application. */}
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black py-2 px-5">
              Play
            </button>
            <button className="border  text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">{movie?.release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200">{truncateString(movie?.overview,180)}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
