import React, { Component } from 'react'
import PropTypes from 'prop-types'
class BookOptions extends Component {

    static propTypes = {

        bookID: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired,
        bookShelf: PropTypes.string.isRequired
    }
   
    render() {
        const { bookID, handler,bookShelf} = this.props
        return (

           
              <div className="book-shelf-changer">
                <select defaultValue={bookShelf} onChange={event =>handler(bookID,event.target.value)}>
                  <option value="move" disabled >Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>

        )
          }
}

    
export default BookOptions