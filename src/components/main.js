import React, { Component } from 'react'
import TreeBeard  from '../common/treebeard'
import data from './data'

class TreeExample extends Component {
    render() {
        return (
            <TreeBeard data={data}/>
        )
    }
}

export default TreeExample