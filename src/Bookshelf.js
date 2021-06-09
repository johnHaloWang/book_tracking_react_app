import React, { Component }from 'react'
import Book from './Book'

class Bookshelf extends React.Component{

  render(){
    // console.log('Props', this.props)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.data.map((item)=>(
              <li key={item.id}>
                <Book book = {item}/>
              </li>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
