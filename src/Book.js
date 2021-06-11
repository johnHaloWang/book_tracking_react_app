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
       value: 'none',
       testing: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
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
    //`url(${_url_})`
    render(){
      return (
        <div className="book">
          <form onSubmit = {this.handleSubmit} className='select-book-form'>
              <div className="book-top">
                 <div className="book-cover"
                  <div className="book-cover" style={{
                    width: 128, height: 188, backgroundImage: {this.state.testing}}}></div>
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
