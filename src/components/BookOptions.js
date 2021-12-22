import React, { Component } from 'react'
import PropTypes from 'prop-types'
class BookOptions extends Component {

    static propTypes = {

        bookID: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired
    }
   
    render() {
        const { bookID, handler} = this.props
        return (

           
              <div className="book-shelf-changer">
                <select defaultValue={"move"} onChange={event =>handler(bookID,event.target.value)}>
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