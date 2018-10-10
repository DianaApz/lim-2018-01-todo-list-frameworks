import React, { Component } from 'react';
import Input from './input';
import ListNotes from './list';

// import { config } from './config';
import firebase from 'firebase';
import 'firebase/database';
import './App.css';
// import { forEach } from '@firebase/util';


class App extends Component {

  constructor(props) {
    super(props);

    this.app = firebase;
    this.data = this.app.database().ref().child('notes');
    this.state = {
      notes: [],
    }
  }
  componentWillMount() {
    const list = this.state.notes;
    this.data.on('child_added', snap => {
      list.push({
        id: snap.key,
        message: snap.val().message,
        check:snap.val().check
      });
      this.setState({
        notes: list
      })
    })
    this.data.on('child_removed', snap => {
      list.forEach((listNote, i) => {
        if (listNote.id === snap.key) {
          list.splice(i, 1);
        }
      })
      this.setState({
        notes: list
      })
    })
    // this.data.on('child_changed', snap => {
    //   list.forEach((listNote) => {
    //     if (listNote.id === snap.key) {
    //       if(listNote.check==='yes'){
    //         snap.check==='no'
    //       }else{
    //         snap.check==='yes'
    //       }
    //     }
    //   })
    //   this.setState({
    //     notes: list
    //   })
    // })
  }
    render() {
      const draw=this.state.notes.map(note=>{
        return(<ListNotes
          id={note.id}
          key={note.id}
          message={note.message}
          delete={this.delete}
          check={note.check}

        />
      )
      })
      return (
        <div className='App' >
          <div className='App-header'>
            <h2>Welcome to-do-list</h2>
            <div><Input add={this.add} /></div>
          </div>
          <div>
            <div>{draw}
            </div>
          </div>
        </div>
      )
    }
  }
  export default App;
