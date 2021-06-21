import React from 'react'
import * as BooksAPI from './api/books-api/BooksAPI'
import './App.css'
import SearchBook from './components/search/SearchBook'
import Bookshelf from './components/books/Bookshelf'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  move_book_to_different_shelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response =>{
          book.shelf = shelf;
          this.setState(oldState =>({
            books: oldState.books.filter(oldBook => oldBook.id !== book.id).concat(book)
          }))
      }
    )
  }

  updateText = (condition) => {
    const list = this.state.books.filter(book => book.shelf === condition)
    return list;
  };

  async componentDidMount(){
    this.getAllBook()
  }

  async getAllBook(){
    const books = await BooksAPI.getAll();
    this.setState({books:[...books]})
  }


  render() {
    return (
      <div className="app">
          <Route exact path='/' render={ ()=>(
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Bookshelf
                        category = {'Currently Reading'}
                        data= {this.updateText('currentlyReading')}
                        onMove={this.move_book_to_different_shelf}
                        books={this.state.books}
                        />
                    <Bookshelf
                        category = {'Want to Read'}
                        data= {this.updateText('wantToRead')}
                        onMove={this.move_book_to_different_shelf}
                        books={this.state.books}
                        />
                    <Bookshelf category = {'Read'}
                        data= {this.updateText('read')}
                        onMove={this.move_book_to_different_shelf}
                        books={this.state.books}
                        />
                  </div>
                </div>
                <div className="open-search">
                  <Link className='open-search-button'
                    to='/search'>
                      <button type="button">
                        Add a book
                      </button>
                  </Link>

                </div>
              </div>
            )} />
          <Route path='/search' render={ ()=>(
              <SearchBook
                  onMove={this.move_book_to_different_shelf}
                  books={this.state.books}
              />
          )} />
        </div>
    )
  }
}

export default BooksApp
