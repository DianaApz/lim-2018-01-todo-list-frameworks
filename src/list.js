import React, { Component } from 'react';

class ListNotes extends Component {

    constructor(props) {
        super(props);
        this.message = props.message;
        this.id = props.id;
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(id) {
        console.log(id);
        this.props.delete(id);
    }

    render() {
        return (
            <div className="note">
                <span className="close"
                    onClick={() => this.handleDelete(this.id)}>
                    x
              </span>
                <p className="message" id={this.id}>{this.message}</p>
            </div>
        )
    }
}

export default ListNotes;