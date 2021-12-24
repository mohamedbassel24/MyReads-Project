import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookOptions from './BookOptions'
class Book extends Component {
  static propTypes = {
    
        bookUrl: PropTypes.string,
        bookTitle: PropTypes.string.isRequired,
        bookAuthors: PropTypes.array,
        bookOptionHandler: PropTypes.func.isRequired,
        bookID: PropTypes.string.isRequired,
        bookShelf: PropTypes.string.isRequired

      
    }


    render() {
        
        const { bookUrl, bookTitle, bookAuthors , bookOptionHandler , bookID ,bookShelf} = this.props

        return (

            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookUrl &&bookUrl})` }}></div>
            <BookOptions bookID = {bookID} handler = {bookOptionHandler} bookShelf={bookShelf}/>
            </div>
            <div className="book-title">{bookTitle}</div>
            <div className="book-authors">{bookAuthors && bookAuthors.join(",")}</div>
          </div>


        )
          }
}

    
export default Book