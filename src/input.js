import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: '',
        }
        this.app = firebase;
        this.data = this.app.database().ref().child('notes');
        this.handleInput = this.handleInput.bind(this);
        this.write = this.write.bind(this);
        this.add = this.add.bind(this);
    }
    handleInput(e) {
        this.setState({
            newMessage: e.target.value, 
        })
    }
    add(note) {
        this.data.push().set({ message: note, check:'no' })
    }
    write() {
        if(this.state.newMessage!==''){
            this.add(this.state.newMessage);
            
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