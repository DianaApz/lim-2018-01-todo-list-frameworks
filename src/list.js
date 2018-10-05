import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
class ListNotes extends Component {
    constructor(props) {
        super(props);
        this.app = firebase;
        this.data = this.app.database().ref().child('notes');
        this.state = { addClass: false }
        this.state = { check: ''}
        this.message = props.message;
        // this.check=props.check;
        this.note = props.note;
        this.id = props.id;
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCheck.bind(this);
        //    let checked=this.state.check
        
        

    }
  componentWillMount() {
        let checked=this.state.check
        this.data.on('child_added', snap => {
            checked=snap.val().check
            this.setState({ 
                check: checked
            })
        })
        this.data.on('child_changed', snap => {
            checked=snap.val().check
            this.setState({ 
                check: checked
            })
        })
        
    }
    

    handleDelete(id) {
        this.props.delete(id);
    }
    handleCheck(id, message, check) {
        // console.log(this.state.check);
        // let color=this.ref.color;
        if (check === 'no') {
            this.data.child(id).set({ message: message, check: 'yes' })
            // color.classList.add('pink')
            this.setState({ addClass: true });
        } else if (check === 'yes') {
            this.data.child(id).set({ message: message, check: 'no' })
            // color.classList.add('black')
            this.setState({ addClass: false });
        }
        // console.log(check)
        // this.props.check(id,message);


        // this.data.child(id).set({message: message, check: 'yes'})
    }


    render() {
        let classList = ['black'];
        if (this.state.addClass) {
            classList.push('pink');
        } 
        return (
            <div className="note">

                <div><span
                    className={classList.join(' ')} 
                    // ref='color'
                    onClick={() => this.handleCheck(this.id, this.message, this.state.check)}>✔</span>
                    <span className="close"
                        onClick={() => this.handleDelete(this.id)}>
                        x
              </span>
                </div>

                <p>{this.message}</p>
            </div>
        )
    }
}

export default ListNotes