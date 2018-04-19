import React, { Component } from 'react'
import Simplest from './simplest'
import Waterfall from './waterfall'

class Home extends Component {
  render() {
    return (
      <div>
        <Simplest/>
        <Waterfall/>
      </div>
    )
  }
}

export default Home