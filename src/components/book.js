import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookOptions from './BookOptions'
class Book extends Component {
  static propTypes = {
    
        bookUrl: PropTypes.string.isRequired,
        bookTitle: PropTypes.string.isRequired,
        bookAuthors: PropTypes.array.isRequired,
        bookOptionHandler: PropTypes.func.isRequired,
        bookID: PropTypes.string.isRequired
      
    }


    render() {
        
        const { bookUrl, bookTitle, bookAuthors , bookOptionHandler , bookID } = this.props

        return (

            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookUrl})` }}></div>
            <BookOptions bookID = {bookID} handler = {bookOptionHandler}/>
            </div>
            <div className="book-title">{bookTitle}</div>
            <div className="book-authors">{bookAuthors.join(",")}</div>
          </div>


        )
          }
}

    
export default Book