import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
        this.props.onMove(this.props.book, this.state.value);
    }

    componentDidMount(){
        console.log("testing com: ", this.props.category)
         this.setState(()=>({
           value: this.props.category
         }))
    }

    render(){
      console.log("testing rending value: ", this.state.value)
      console.log("testing rending book: ", this.props.book)
      console.log("testing rending category: ", this.props.category)
      return (
        <div className="book">
          <form onSubmit = {this.handleSubmit} className='select-book-form'>
              <div className="book-top">
                 <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}>
                </div>
                 <div className="book-shelf-changer">
                    <select value={this.state.value} onChange={this.handleChange}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
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
