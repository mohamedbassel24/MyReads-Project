import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/bookShelf'
class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books : []
  }
  fetchAllBooks()
  {
    return BooksAPI.getAll().then(
      {

      }
    );
  }
  componentDidMount()
  { 
    
    BooksAPI.getAll()
    .then((fetchedBooks) => {
      this.setState((currentState) => ({
        books:fetchedBooks
         
      })
      )
    })

  }
  currentlyReadingbooks=[];
  
  want2ReadBooks = [];
  readBooks = [];
  render() {
    console.log(this.state.books)
    this.currentlyReadingbooks = this.state.books.filter (book => book.shelf === 'currentlyReading')
    this.want2ReadBooks = this.state.books.filter (book => book.shelf === "wantToRead")
    this.readBooks = this.state.books.filter (book => book.shelf === "read")
    
    
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : 
        (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf 
              currentlyReadingbooks = {this.currentlyReadingbooks}
              bookshelfTitle={'Currently Reading'} /> 
              <BookShelf 
              currentlyReadingbooks = {this.want2ReadBooks}
              bookshelfTitle={'Want to Read'} /> 
              <BookShelf 
              currentlyReadingbooks = {this.readBooks}
              bookshelfTitle={'Read'} /> 
          
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
