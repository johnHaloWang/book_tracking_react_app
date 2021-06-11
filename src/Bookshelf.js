import React, { Component }from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component{
  static propTypes = {
    data: PropTypes.array.isRequired,
    onMove: PropTypes.func.isRequired
  };

  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.data.map((item)=>(
              <li key={item.id}>
                <Book book = {item}
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
