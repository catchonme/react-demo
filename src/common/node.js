import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VelocityTransitionGroup } from 'velocity-react';

class TreeNode extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { node, onToggle } = this.props;
        /*
        * 开始node没有toggled属性，所以开始toggled是undefined
        * 在treebeard中onToggle函数中，给node增加了toggled属性
        * 点击修改node的toggled属性，来展开/收缩node.children
        * */
        const { toggled } = node;

        if (onToggle) {
            onToggle(node, !toggled);
        }
    }

    animations() {
        const {animations} = this.props;

        return {
            toggle: animations.toggle(this.props),
            drawer: animations.drawer(this.props)
        };
    }

    decorators() {
        const {decorators} = this.props;

        return Object.assign({}, decorators);
    }

    render() {
        const {style} = this.props;
        const decorators = this.decorators();
        const animations = this.animations();

        return (
            <li style={style.base}>
                {this.renderHeader(decorators, animations)}

                {this.renderDrawer(decorators, animations)}
            </li>
        );
    }

    renderHeader(decorators, animations) {
        const {node, style} = this.props;
        const {children} = node;
        const hasChildren = !!children;

        return (
            <decorators.Header animations={animations}
                               node={node}
                               onClick={this.onClick}
                               style={style}
                               hasChildren={hasChildren}/>
        );
    }

    renderDrawer(decorators, animations) {
        const {node: {toggled}} = this.props;

        const {...restAnimationInfo} = animations.drawer;
        return (
            <VelocityTransitionGroup {...restAnimationInfo}>
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }

    renderChildren(decorators) {
        const {animations, decorators: propDecorators, node, style, onToggle} = this.props;

        if (node.loading) {
            return this.renderLoading(decorators);
        }

        let children = node.children;
        if (!Array.isArray(children)) {
            children = children ? [children] : [];
        }

        return (
            <ul style={style.subtree}>
                {children.map((child, index) =>
                    <TreeNode
                        animations={animations}
                        decorators={propDecorators}
                        onToggle={onToggle}
                        key={child.id || index}
                        node={child}
                        style={style}
                    />
                )}
            </ul>
        );
    }

    renderLoading(decorators) {
        const {style} = this.props;

        return (
            <ul style={style.subtree}>
                <li>
                    <decorators.Loading style={style.loading}/>
                </li>
            </ul>
        );
    }
}

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onToggle: PropTypes.func
};

export default TreeNode;
