import React, { Component }from 'react'
// import Book from './Book'

class Book extends React.Component{
  
  render(){
    console.log('Props', this.props)
    return (
      <div className="book">
        <div className="book-top">
           <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: this.props.book.bookUrl }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.id}</div>
        <div className="book-authors">{this.props.book.author}</div>
      </div>
    )
  }
}

export default Book
