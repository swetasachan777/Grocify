import React from 'react'
import MainBanner from '../components/main_banner'
import Categories from '../components/Categories'
import Best_seller from '../components/Best_seller'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        {/* <Best_seller/> */}

    </div>
  )
}

export default Home