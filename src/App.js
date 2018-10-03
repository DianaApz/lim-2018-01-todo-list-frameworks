import React, { Component } from 'react';
import ListNotes from './list';
import Input from './input';
import firebase from 'firebase';
import { config } from './config';
import 'firebase/database';
import './App.css';
import { forEach } from '@firebase/util';


class App extends Component {

  constructor(props) {
    super(props);   
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child('notes');
    this.state = {
      notes: [
        // { id: 1, message: 'hola' },
        // { id: 2, message: 'hi' }
      ],
    }
  }
  componentWillMount(){
    const list = this.state.notes;
    this.database.on('child_added', snap => {
      list.push({
        id: snap.key,
        message: snap.val().message
      })
    })
    this.setState({
       notes: list
    })
    this.database.on('child_removed', snap => {
        list.forEach((listNote,i)=>{
          if(listNote.id === snap.key){
            list.splice(i, 1);
          }
        })
      this.setState({
        notes: list
      })
    })
  }

  add(note) {
    this.database.push().set({ message: note})
    // const list = this.state.notes;
    // list.push({
    //   id: list.length + 1,
    //   message: note
    // });
    // this.setState({
    //   notes: list
    // })

  }

  delete(id) {
    this.database.child(id).remove();
    // const items=this.state.notes.filter(note=>{
    //   return(note.id !== id)
    // })
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to-do-list</h2>
          <div><Input add={this.add} /></div>
        </div>
        <div className="App-intro">
        {
          this.state.notes.map(note => {
            return (
              <ListNotes
              id={note.id}
              key={note.id}
              message={note.message}
              delete={this.delete} />
            )
          })
        }
        </div>
      </div>
    )
  }
}
export default App;
