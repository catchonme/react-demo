import React, { Component } from 'react'
import TreeBeard from '../common/treebeard'
import data from '../mock/data'

class TreeExample extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle(node, toggled) {
        /*if (this.state.cursor) {
            this.state.cursor.active = false;
        }*/
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({ cursor: node})
    }
    render() {
        return (
            <TreeBeard
                data={data}
                onToggle={this.onToggle}
            />
        )
    }
}

export default TreeExample