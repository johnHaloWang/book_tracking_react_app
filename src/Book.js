import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import serializeForm from 'form-serialize'

class Book extends Component{

     static propTypes = {
       book: PropTypes.object.isRequired,
       onMove: PropTypes.func.isRequired,
       category: PropTypes.string.isRequired
     }

     state = {
       value: 'none'
     }

     handleChange = (e) =>{
       this.setState({value: e.target.value});
     }

     handleSubmit = (e) =>{
       e.preventDefault();
       if(this.state.value!=='none'){
         this.props.onMove(this.props.book, this.state.value);
       }
    }

    render(){
      return (
        <div className="book">
          <form onSubmit = {this.handleSubmit} className='select-book-form'>
              <div className="book-top">
                 <div className="book-cover"
                    style={{ width: 128, height: 188,
                      backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
                      }}>
                </div>
                 <div className="book-shelf-changer">
                    <select value={this.state.value} onChange={this.handleChange}>
                      <option value="move" disabled>Move to...</option>
                      {this.props.category !== 'Currently Reading' ?<option value="currentlyReading">Currently Reading</option>:null}
                      {this.props.category !== 'Want to Read' ?<option value="wantToRead">Want to Read</option>:null}
                      {this.props.category !== 'Read' ?<option value="read">Read</option>:null}
                      <option value="none">None</option>
                    </select>
                 </div>
              </div>
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">{this.props.book.authors}</div>
              <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
}

export default Book
