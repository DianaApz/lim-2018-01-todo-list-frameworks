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
        this.note = props.note;
        this.id = props.id;
        this.delete = this.delete.bind(this);
        this.check.bind(this);
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
    delete(id) {
        this.data.child(id).remove();
    }
    check(id, message, check) {
        // console.log(this.state.check);
        // let color=this.refs.color;
        // let classList = ['black'];
        // if (this.state.addClass) {
            
        
        if (check === 'no') {

            this.data.child(id).set({ message: message, check: 'yes' })
            return(
                <span className="pink">✔</span>
            )
            // classList.push('pink');
            // this.setState({ check:'yes', bgColor: 'pink' });
        } else if (check === 'yes') {
            // color.classList.add('pink')
            // color.classList.remove('pink')
             this.data.child(id).set({ message: message, check: 'no' })
            return(
                <span className="black">✔</span>
            )
    
            // this.setState({ check:'no', bgColor: 'black' });
            
            
        }
        // console.log(check)
        // this.props.check(id,message);


        // this.data.child(id).set({message: message, check: 'yes'})
    }


    render() {
        
        return (
            <div className="note">

                <div><span
                    // className={classList.join(' ')} 
                    // ref='color'
                    onClick={() => this.check(this.id, this.message, this.state.check)}>✔</span>
                    <span className="close"
                        onClick={() => this.delete(this.id)}>
                        x
              </span>
                </div>

                <p>{this.message}</p>
            </div>
        )
    }
}

export default ListNotes