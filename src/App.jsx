import { useState } from 'react'
import './App.css'
import { GeoMap } from './components/GeoMap'
import { Header } from './components/Header'
import { SidePanel } from './components/SidePanel'

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header name="ArcGIS Demo App"/>
      <main className="flex h-full">
        <SidePanel/>
        <GeoMap />
      </main>
    </div>
  )
}

export default App
