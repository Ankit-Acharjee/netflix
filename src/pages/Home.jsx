// import { useEffect, useState } from "react"
import Main from "../Components/Main"
import Row from "../Components/Row"
import requests from "../Requests"



const Home = () => {

  return (
    <>
    <Main />
    <Row title='Upcoming' fetchUrl={requests.requestUpcoming}/>
    <Row title='Trending' fetchUrl={requests.requestTrending}/>
    <Row title='Top Rated' fetchUrl={requests.requestTopRated}/>
    <Row title='Popular' fetchUrl={requests.requestPopular}/>
    </>
  )
}

export default Home