import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TreeNode from './node'
import defaultDecorators from './decoration'
import defaultTheme from '../themes/default'
import defaultAnimations from '../themes/animations'

class TreeBeard extends Component {
 render() {
     const { animations, decorators, data: propsData, onToggle, style } = this.props;
     let data = propsData;

     if (!Array.isArray(data)) {
         data = [data];
     }

     return (
         <ul style={style.tree.base}
             ref={ref => this.treeBaseRef = ref}>
             {data.map((node, index) =>
                <TreeNode
                    style={style.tree.node}
                    node={node}
                    decorators={decorators}
                    animations={animations}
                    key={node.id || index}
                    onToggle={onToggle}/>
             )}
         </ul>
     );
 }
}

TreeBeard.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    decorators: PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default TreeBeard;