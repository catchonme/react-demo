import React, { Component } from 'react'
import ReactShow from '../common/index'
import './style.css'

class Demo extends Component {
    state = {
        show: true,
        axis: 'y',
        showSecondary: false,
        duration: 500,
        easing: 'easeOutQuint',
        unmountOnHide: true,
        style: JSON.stringify({}, null, 2),
        styleHide: JSON.stringify(
            {
                height: 0,
            },
            null,
            2
        ),
        styleShow: JSON.stringify(
            {
                height: 'auto',
            },
            null,
            2,
        ),
        extraItems: [],
    }
    render() {
        const {
            show,
            showSecondary,
            duration,
            easing,
            unmountOnHide,
            style,
            styleHide,
            styleShow,
            extraItems,
        } = this.state

        const computeStyle = s => {
            try {
                return JSON.parse(s)
            } catch (err) {
                console.warn(err)
                return {}
            }
        }

        const demoInstance = (
            <div>
                <div className="blockOne"></div>
                <ReactShow
                    show={show}
                    easing={easing}
                    duration={duration}
                    onmountOnHide={unmountOnHide}
                    style={computeStyle(style)}
                    styleHide={computeStyle(styleHide)}
                    styleShow={computeStyle(styleShow)}
                >
                    <div className="blockTwo">
                        This is some content
                        <br />
                        This is some more content!
                        <br />
                        Even more Content!
                        <div>
                            {extraItems.map((d, i) => (
                                <div key={i}>
                                    Even more content!<br />
                                </div>
                            ))}
                        </div>
                        <ReactShow
                            show={showSecondary}
                            easing={easing}
                            duration={duration}
                            unmountOnHide={unmountOnHide}
                            styleHide={computeStyle(styleHide)}
                            styleShow={computeStyle(styleShow)}
                        >
                            <div>
                                <br />
                                <div>Second</div>
                                <div>Level</div>
                                <div>Content</div>
                                <div>Goes</div>
                                <div>Here</div>
                                <div>
                                    {extraItems.map((d,i) => (
                                        <div key={i}>
                                            Even more content!<br />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ReactShow>
                    </div>
                </ReactShow>
                <div className="blockThree"/>
            </div>
        )

        return (
            <div className="container">
                <table>
                    <thead/>
                    <tbody>
                    <tr>
                        <td>duration</td>
                        <td>
                            <input value={duration}
                                   onChange={e => {this.setState({duration:e.target.value})}} style={{width:'2em'}}/></td>
                    </tr>
                    <tr>
                        <td>easing</td>
                        <td>
                            <select value={easing}
                                    onChange={e => { this.setState({easing: e.target.value})}} style={{width:'8rem'}}>
                                {Object.keys(ReactShow.easings).map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <button onClick={() => this.setState({show:!show})}>{show ? 'Hide' : 'Show'}</button>
                <button onClick={() => this.setState({showSecondary: !showSecondary})}>{showSecondary ? 'Hide Secondary' : 'Show Secondary'}</button>
                <button onClick={() => this.setState({extraItems:[...extraItems,'']})}>Add Content</button>
                <br />
                <br />
                {demoInstance}
                {demoInstance}
            </div>
        )
    }
}

export default Demo