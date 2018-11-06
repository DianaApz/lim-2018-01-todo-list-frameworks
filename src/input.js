import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: '',
            newName: ''
        }
        this.app = firebase;
        this.data = this.app.database().ref().child('notes');
        this.handleInput = this.handleInput.bind(this);
        this.handleName = this.handleName.bind(this);
        this.write = this.write.bind(this);
        this.add = this.add.bind(this);
    }
    handleInput(e) {
        this.setState({
            newMessage: e.target.value,
        })
    }
    handleName(e) {
        this.setState({
            newName: e.target.value,
        })
    }
    add(note, name) {
        this.data.push().set({ message: note, check: 'no', name: name })
    }
    write = () => {
        if (this.state.newMessage !== '') {
            this.add(this.state.newMessage, this.state.newName);

            this.setState({
                newMessage: '',
                newName: ''
            })
        } else {
            alert('write again');
        }
    }
    render() {
        return (
            <div className="inputWrite">
                <div className="card d-flex justify-content-center">
                    <div className="card-body align-self-center">
                        <input className="input text-center"
                            placeholder="write message "
                            value={this.state.newMessage}
                            onChange={this.handleInput} type="text"
                        />
                        <br></br>
                        <input className="input text-center"
                            placeholder="write your name"
                            value={this.state.newName}
                            onChange={this.handleName} type="text"
                        />
                        <br></br>
                        <button type="button" className="btn btn-info"
                            onClick={this.write}>add</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Input