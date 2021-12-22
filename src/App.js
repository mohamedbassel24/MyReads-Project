import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfCreator from './components/BookShelfCreator'
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
  
  changeBookShelf = (targeBookId , newStatus) =>
  {

    console.log("wewaesewewewewewe",targeBookId,newStatus)
    this.setState((currentState) => ({
      books: currentState.books.filter((book) => {
         //Search for the book in the component state
        if (book.id === targeBookId)
        {
          //Modify its property
          book.shelf = newStatus;
        }
        return book
      })
    }))
     // make API call for the changes 

  }
 /*  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact)
  }
  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  } */




  // shelfList items represents each shelf and how to filter its book status 
  shelfList = [
    {
      shelfTitle:'Currently Reading',
      filterBookMethod:'currentlyReading'
    },
    {
      shelfTitle:'Want to Read',
      filterBookMethod:'wantToRead'
    },
    {
      shelfTitle:'Read',
      filterBookMethod:'read'
    }
  ]

  render() {
    const allCurrBooks = this.state.books
    console.log('all Books:',this.state.books)  
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

          <BookShelfCreator shelfList = {this.shelfList} allBooks = {allCurrBooks} bookShelfChangeListner = {this.changeBookShelf}/>

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
