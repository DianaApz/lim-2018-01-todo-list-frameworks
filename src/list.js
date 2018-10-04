import React, { Component } from 'react';
class ListNotes extends Component {
    constructor(props) {
        super(props);
        this.state = { addClass: false }
        this.message = props.message;
        this.id = props.id;
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClass.bind(this);
    }
    handleClass() {
        this.setState({ addClass: !this.state.addClass });
    }

    handleDelete(id) {
        this.props.delete(id);
    }


    render() {
        let classList = ['black'];
        if (this.state.addClass) {
            classList.push('pink');
        } 
        return (
            <div className="note">

                <div className='section'><span className={classList.join(' ')} onClick={() => this.handleClass()}>✔</span>
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