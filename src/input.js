import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: '',
        }
        this.handleInput = this.handleInput.bind(this);
        this.write = this.write.bind(this);
    }
    handleInput(e) {
        console.log(this);
        this.setState({
            newMessage: e.target.value, 
        })
    }
    write() {
        this.props.add(this.state.newMessage);
        this.setState({
            newMessage: '',
        })
    }
    render() {
        return (
            <div>
                <input
                    placeholder="Write ..."
                    value={this.state.newMessage}
                    onChange={this.handleInput} />
                <button
                    onClick={this.write}>Add Note</button>
            </div>
        )
    }
}
export default Input