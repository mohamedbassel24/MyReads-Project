import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfCreator from './components/BookShelfCreator'
import { Route , Link} from 'react-router-dom';
import BookSearch from './components/BookSearch'
class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books : []
  }

/**
* @description Represents a book
* @constructor
* @param {string} title - The title of the book
* @param {string} author - The author of the book
*/
  
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
  /**
* @description Represents a book
* @constructor
* @param {string} title - The title of the book
* @param {string} author - The author of the book
*/
  changeBookShelf = (targeBookId , newStatus) =>
  {

    console.log("Book with this ID and this state:",targeBookId,newStatus)
    this.setState((currentState) => ({
      books: currentState.books.filter((book) => {
         //Search for the book in the component state
        if (book.id === targeBookId)
        {
          //Modify its property
           book.shelf = newStatus;
          
          // make API call for the changes
          BooksAPI.update(book,newStatus)
          .then( (res)=> console.log('Respond after shelfIpdate'))
          
        }
        return book
      })
    }))
  }


  // this Functio get the book and shelf and concat to bookList and make API update call
  addBookShelf = (searchedBook , newStatus) =>
  {

    console.log("Book and this state:",searchedBook,newStatus)
    this.setState((currentState) => ({
      books: currentState.books.concat(searchedBook)
        
      })
    )

        // make API call for the changes
    BooksAPI.update(searchedBook,newStatus).then( (res)=> console.log('Respond after shelfIpdate'))

  }

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

  fetchbookListShelf = () =>
  {
    let bookShelfList = [];
    this.state.books.map(
      book =>
      {
        bookShelfList.push({id:book.id,shelfType:book.shelf})
        return book
      }
    )
    return bookShelfList
  
  }

  render() {
    const allCurrBooks = this.state.books
    console.log('all Books:',this.state.books)  
    return (
      <div>
        <div className="app">
       
          <Route exact path='/' render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelfCreator shelfList = {this.shelfList} allBooks = {allCurrBooks} bookShelfChangeListner = {this.changeBookShelf}/>
             </div>
          <div className="open-search">
    
            <Link to="/search"><button>Add a book</button></Link>
                      
          </div>
        </div>
        )} />
        <Route path='/search' render={() => (
       
          <BookSearch addToTheShelf={this.addBookShelf} bookShelfList = {this.fetchbookListShelf()}/>
        )} />
      </div>
      </div>
    )
  }
}

export default BooksApp
