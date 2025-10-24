import React from 'react'
import Homeheader from './components/Homeheader'
import Homebody from './components/Homebody'
import Homefooter from './components/Homefooter'

export default function page() {
  return (
    <div>
      <Homeheader />
      <Homebody />
      <Homefooter />
    </div>
  )
}
