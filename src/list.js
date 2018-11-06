import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
class ListNotes extends Component {
    constructor(props) {
        super(props);
        this.app = firebase;
        this.data = this.app.database().ref().child('notes');
        this.state = { addClass: false }
        this.state = { check: '' }
        this.message = props.message;
        this.id = props.id;
        this.name = props.name;
        this.delete = this.handleDelete.bind(this);
        this.check.bind(this);
    }
    componentWillMount() {
        let checked = this.state.check
        this.data.on('child_added', snap => {
            checked = snap.val().check
            this.setState({
                check: checked
            })
        })
        this.data.on('child_changed', snap => {
            checked = snap.val().check
            this.setState({
                check: checked
            })
        })
    }
    check(id, name, message, check) {
        if (check === 'no') {
            this.data.child(id).set({ name: name, message: message, check: 'yes' })
            return (
                <span className="pink">✔</span>
            )
        } else if (check === 'yes') {
            this.data.child(id).set({ name: name, message: message, check: 'no' })
            return (
                <span className="black">✔</span>
            )
        }
    }
    handleDelete(id) {
        this.data.child(id).remove();
    }

    render() {
        return (
            <div className="col-sm-12 col-md-6 list">
                <div className="card">
                    <div className="card-body">
                        <div className="float-right">
                            <span 
                            onClick={() => this.check(this.id, this.name, this.message, this.state.check)}>✔</span>
                            <span className="check" onClick={() => this.handleDelete(this.id)}><i className="fas fa-trash-alt"
                            >
                            </i></span>
                        </div>
                        <p className="card-text">{this.message}</p>
                        <footer className="blockquote-footer">By : {this.name}</footer>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListNotes