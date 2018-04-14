import React from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';

const Loading = ({style}) => {
    return <div style={style}>loading...</div>;
};
Loading.propTypes = {
    style: PropTypes.object
};

const HeaderToggle = ({style}) => {
    const {height, width} = style;
    const midHeight = height * 0.5;
    const points = `0,0 0,${height} ${width},${midHeight}`;

    return (
        <div style={style.base}>
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon points={points}
                             style={style.arrow}/>
                </svg>
            </div>
        </div>
    );
};
HeaderToggle.propTypes = {
    style: PropTypes.object
};

const HeaderName = ({node, style}) => {
    return (
        <div style={style.base}>
            <div style={style.title}>
                {node.name}
            </div>
        </div>
    );
};
HeaderName.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired
};

const Header = ({style, hasChildren, onClick, node, animations}) => {
    return (
        <div onClick={onClick}>
            {hasChildren ? <RenderToggle animations={animations} style={style}/> : null}

            <HeaderName node={node}
                    style={style.header}/>
        </div>
    );
}
Header.propTypes = {
    style: PropTypes.object.isRequired,
    hasChildren: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired
};

const RenderToggle = ({animations, style}) => {
    return (
        <VelocityComponent animation={animations.toggle.animation}
                           duration={animations.toggle.duration}>
            <HeaderToggle style={style.toggle}/>
        </VelocityComponent>
    );
}


export default {
    Loading,
    Header
};
