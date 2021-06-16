
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
    // console.log("called updateText", this.state.error)
    if(this.state.error !== true && this.state.results !== undefined && this.state.results.length !== undefined){
      console.log("updateText condition 1: ", this.state.error)
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
      console.log("called list1: ", list)
      return list;
    }else if(this.state.error === false && this.state.query === ''){
      console.log("updateText condition 2: ", this.state.error)
      console.log("updateText condition 2: ", this.state.results)
      console.log("updateText condition 2: ", this.state.query)
      return []
    }else{
      console.log("updateText condition 3: ", this.state.error)
      console.log("updateText condition 3: ", this.state.results)
      console.log("updateText condition 3: ", this.state.query)
      return []
    }
  };

   updateStatement = (state, props, query)=>{
     console.log("passed in: ", query)
     return { ...state, error: false, query: query.trim()};
   };

  updateQuery = (query)=>{
    console.log("called updateQuery: ", query)
    this.setState(state => ({ ...state, error: false, query: query.trim()}));
    // console.log("called updateQuery check for query: ", query)
    // console.log("called updateQuery check for state.query: ", this.state.query)
    if(query.trim()!==''){
      // this.componentDidMount();
      BooksAPI.search(query)
       .then((books)=>{
         this.setState(()=>({
              error: (books===undefined || (books[0] !== undefined  && books[0].error === "empty query"))?
                                  true
                                  :
                                  false,
              results: (this.state.error === true)?[]:books,
              query: query
         }))
       })
      this.state.error = ((this.query !== '' && this.state.results===undefined) ||
                         (this.state.results[0] !== undefined && this.state.results[0].error !== undefined))
                         ?
                          true
                          :
                          false;
      console.log("testing updateQuery result on error: ", this.state.error)
    }else{
      console.log("query is empty ")
    }
  }

  // getData(){
    // BooksAPI.search(this.state.query)
    //  .then((books)=>{
    //    this.setState(()=>({
    //         error: (books===undefined || (books[0] !== undefined  && books[0].error === "empty query"))?
    //                             true
    //                             :
    //                             false,
    //         results: (this.state.error === true)?[]:books,
    //         query: this.state.query
    //    }))
    //  })
  // }

  // componentDidMount(){
  //   this.getData()
  //   console.log("com testing: ", this.state.query)
  // }

  render(){
    return (

        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
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
            //comment
            //init state when this.state === false && this.state.query === ''
            (this.state.error === false && this.state.query === '')?
            //display nothng
            ""
            :
            (this.state.error === true && this.state.query !== '')?
                "Error in searching .... can't find any results"
              :
                <Bookshelf
                    category = {'none'}
                    data= {this.updateText()}
                    onMove={this.props.onMove} />
          }
          </div>
        </div>
    )
  }
}

export default SearchBook
