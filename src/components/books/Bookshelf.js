import React, { Component }from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onMove: PropTypes.func.isRequired
  };

  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{
          (this.props.category === 'none')? 'Search Result':this.props.category
        }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.data.map((item)=>(
              <li key={item.id}>
                <Book book = {item}
                  books = {this.props.books}
                  onMove={this.props.onMove}
                  category={this.props.category}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
