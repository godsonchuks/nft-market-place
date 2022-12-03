import React from 'react'
import Hero from './hero'
import Collections from './collections'
import TopCollections from './topCollections'
import TopNftCreator from './top-nft-creator'
export default function Home() {
  return (
    <div>
      <Hero />
      <Collections />
      <TopCollections />
      <TopNftCreator />
    </div>
  )
}
