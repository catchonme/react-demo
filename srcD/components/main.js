import React, { Component } from 'react'
import { ThemeContext, themes, TextContext, texts } from "./theme-context";

function ThemedButton() {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <TextContext.Consumer>
                    {
                        text => (
                            <button style={{backgroundColor:theme.background}}>{text}</button>
                        )
                    }
                </TextContext.Consumer>
            )}
        </ThemeContext.Consumer>
    )
}

function Toolbar(props) {
    return (
        <div onClick={props.changeTheme}>
            <ThemedButton>Theme Button</ThemedButton>
        </div>
    )
}

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            theme: themes.dark,
            text: texts.prev
        }
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme = () => {
        this.setState(state => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark,
            text: state.text === texts.prev ? texts.next : texts.prev
        }))
    }

    render() {
        return (
            <div>
                <ThemeContext.Provider value={this.state.theme}>
                    <TextContext.Provider value={this.state.text}>
                        <Toolbar changeTheme={this.toggleTheme} />
                    </TextContext.Provider>
                </ThemeContext.Provider>
                <section>
                    <ThemedButton>button</ThemedButton>
                </section>
            </div>
        );
    }
}

export default App