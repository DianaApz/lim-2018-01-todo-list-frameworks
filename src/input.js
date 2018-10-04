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
        this.setState({
            newMessage: e.target.value, 
        })
    }
    write() {
        if(this.state.newMessage!==''){
            this.props.add(this.state.newMessage);
            this.setState({
               newMessage: '',
           })
        }else{
            alert('write');
        }
    }
    render() {
        return (
            <div>
                <input
                    placeholder="Write ..."
                    value={this.state.newMessage}
                    onChange={this.handleInput} type="text"
                />
                <button
                    onClick={this.write}>add</button>
            </div>
        )
    }
}
export default Input