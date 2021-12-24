import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
class BookSearch extends Component {

  state = {
    searchResults: []
  }
  static propTypes = {
    
    addToTheShelf: PropTypes.func.isRequired,
    bookShelfList: PropTypes.array.isRequired
    }
    getSearchResult = (event) =>
    {
      const searchInput = event.target.value
      console.log(searchInput)

      if (searchInput.length > 0) {
        BooksAPI.search(searchInput).then( searchedBooks =>
          {
       
            console.log(searchedBooks)
            this.setState((currentState) => ({
              searchResults:searchedBooks
               
            })
            )
            console.log(this.state.searchResults)
          }
        ).catch( 
          error => {
            // Empty Query no searach results 
            console.log("here")
            this.setState((currentState) => ({
              searchResults:[]
               
            })
            )
          }
        )
      }
      else{
        this.setState((currentState) => ({
          searchResults:[]
           
        })
        )
      }
    }

    searchOptionHandler =  (targeBookId , newStatus) =>
    {
  
      const {addToTheShelf} = this.props

      this.state.searchResults.map(
        book =>{
          if (book.id === targeBookId )
        {
          //Modify its property
          book.shelf = newStatus;
          addToTheShelf(book,newStatus)
        }
        return book
        }
      )
      console.log("Book with this ID and this state:",targeBookId,newStatus)
    }
  
    getShelfType =  (bookID) =>
    {
      const {bookShelfList} = this.props
      
      for (const bookState of bookShelfList)
      {
        
        if (bookState.id ===bookID)
        {
          return bookState.shelfType
        }
      }
      return 'none'


    }
    render() {

        return (  
              <div className="search-books">
        <div className="search-books-bar">
          <Link to ="/">
          <button className="close-search" >Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
 
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input onChange={event =>this.getSearchResult(event)} type="text" placeholder="Search by title or author"/>
 
          </div>
        </div>
        <div className="search-books-results">
        {this.state.searchResults.length  > 0 &&( <ol className="books-grid">
          {  this.state.searchResults.map( (book) =>//book.imageLinks.thumbnail book.title book.author 
                      <li key = {book.id}>
                        <Book bookUrl = {book.imageLinks.thumbnail}
                         bookTitle = {book.title} 
                         bookAuthors = {book.authors}
                         bookOptionHandler = {this.searchOptionHandler}
                         bookID = {book.id}
                         bookShelf = {this.getShelfType(book.id)}
                        />
                      </li>
                    )}

          </ol>)}
        </div>
        
      </div>)
    }
}
export default BookSearch