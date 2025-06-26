import React from 'react'
import MainBanner from '../components/Main_banner'
import Categories from '../components/Categories'
import Best_seller from '../components/Best_seller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        <Best_seller/>
        <BottomBanner/>
        <NewsLetter/>

    </div>
  )
}

export default Home