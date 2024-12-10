import React from 'react'
import Banner from './Banner'
import NewArrivals from './NewArrivals'
import ExclusiveDeals from './ExclusiveDeals'
import CategoryHighLights from './CategoryHighLights'
import BestSeller from './BestSeller'
import Newsletter from '../Account/Newsletter'
import TrendingProducts from './TrendingProducts'
import Testimony from '../Testimony/Testimony'


function Home() {
  return (
    <div>
     <Banner/>
     <CategoryHighLights/>
     <BestSeller/>
     <NewArrivals/>
     <ExclusiveDeals/>
     <TrendingProducts/>
     <Newsletter/>
     <Testimony/>
    </div>
  )
}

export default Home