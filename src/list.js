import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
class ListNotes extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.app=firebase;
        this.data = this.app.database().ref().child('notes');
        this.state = { addClass: false }
        this.message = props.message;
        this.check=props.check;
        this.note = props.note;
        this.id = props.id;
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCheck.bind(this);
    }
    

    handleDelete(id) {
        this.props.delete(id);
    }
    handleCheck(id,message,check){
        
        if(check==='no'){
            this.data.child(id).set({message: message, check: 'yes'})
            this.setState({ addClass: true });
        }else if (check==='yes'){
            this.data.child(id).set({message: message, check: 'no'})
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

                <div className='section'><span 
                className={classList.join(' ')} 
                 onClick={() => this.handleCheck(this.id,this.message,this.check)}>✔</span>
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