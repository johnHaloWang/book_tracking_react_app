
import React from 'react'
import * as BooksAPI from '../../api/books-api/BooksAPI'
import PropTypes from 'prop-types'
import Bookshelf from '../books/Bookshelf'
import { Link } from 'react-router-dom'

class SearchBook extends React.Component{
  static propTypes = {
    onMove: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: [],
    error: false
  }

  updateText = () => {
    console.log("called")
    console.log("state: ", this.state.results)
    console.log("tested error: ", this.state.error)
    if(this.state.error !== true && this.state.results.length !== undefined){
      const list = this.state.results.filter(function(b) {
        if(b!== null &&
               b!== undefined &&
               b.error === undefined &&
               b.imageLinks !== null &&
               b.imageLinks !== undefined &&
               b.authors !== null &&
               b.authors !== undefined)
               return b;
      });
      console.log("called list: ", list)
      return list;
    }else{
      return []
    }


  };

  updateQuery = (query)=>{
    this.setState(() => ({
      query: query.trim()

    }))
    if(this.query !== ''){
      this.componentDidMount();
      // console.log("testing ->: ", this.state.results)
      // this.state.error = (this.query !== '' && this.state.results===undefined || (this.state.results[0] !== undefined && this.state.results[0].error !== undefined))?
      //                     true
      //                     :
      //                     false;
      console.log("testing update: ", this.state.error)
    }

  }

  componentDidMount(){
    BooksAPI.search(this.state.query)
     .then((books)=>{
       this.setState(()=>({
            error: (books===undefined)?
                                true
                                :
                                (books[0] !== undefined  && books[0].error === "empty query")?
                                  true:false,
            results: (this.state.error === true)?[]:books
            // results: books
       }))
     })
  }
  render(){
    return (

        <div className="search-books">

          <div className="search-books-bar">
            <Link
              to='/'
              className="close-search"
            >Close
            </Link>
            <div className="search-books-input-wrapper">
              {
                // this.state.error =
                // (this.state.query !== '' && this.state.results.length === 1 && this.state.results[0]===undefined)
                // ||
                // (this.state.query !== '' && this.state.results.length === 1 && this.state.results[0].error === "empty query")
                // ?true:false

                /*

                NOTES: The search from BooksAPI is limited to a particular set of search terms.
              s  You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                className = 'search-by-titel-or-author'
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event)=> this.updateQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
          {
            (this.state.error === true && this.state.query !== '')?
                "Error in searching .... can't find any results"
              :
                // (this.state.error === false  && this.state.results.length !== 0)?
                // (this.state.query !== '')?
                <Bookshelf
                    category = {'none'}
                    data= {this.updateText()}
                    onMove={this.props.onMove}
                />
                // :
                // ""
          }
          </div>
        </div>
    )
  }
}

export default SearchBook
