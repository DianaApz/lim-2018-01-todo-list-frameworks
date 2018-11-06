import React, { Component } from 'react';
import Input from './input';
import ListNotes from './list';
import firebase from 'firebase';
import 'firebase/database';
import './App.css';
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
        name: snap.val().name,
        message: snap.val().message,
        check: snap.val().check,
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
  }
  render() {
    const draw = this.state.notes.map(note => {
      return (<ListNotes
        key={note.id}
        id={note.id}
        name={note.name}
        message={note.message}
        delete={this.delete}
        check={note.check} />
      )
    })
    return (
      <div>
        <div className='navbar navbar-dark bg-info text-white'>
          <h4>To-do-list</h4>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <Input add={this.add} />
            </div>
            <div className="col-sm-12 col-md-9">
              <div className="row">
                {draw}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
