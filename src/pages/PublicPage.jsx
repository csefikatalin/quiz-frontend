import React, { useContext } from 'react'
import Kerdesek from '../components/public/Kerdesek'
import { KerdesekContext } from '../contexts/KerdesekContext'

export default function PublicPage() {
  const {kerdesekLista}=useContext(KerdesekContext)
  console.log(kerdesekLista)
  return (
    <div>
      
      <Kerdesek /></div>
  )
}
