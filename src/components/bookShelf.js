import React , {Component} from 'react'
import PropTypes from 'prop-types';
import Book from './Book'
class BookShelf extends Component
{
  static propTypes = {
    
    bookshelfTitle: PropTypes.string.isRequired,
    shelfBooks: PropTypes.array.isRequired,
    bookShelfChangeListner: PropTypes.func.isRequired
    }
    
    render()
    {
      const {bookshelfTitle,bookShelfChangeListner}= this.props;
      const books = this.props.shelfBooks  
        return (
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                  <div className="bookshelf-books">
                    
                   {
                   books  !== undefined && ( <ol className="books-grid">
                    {  books.map( (book) =>//book.imageLinks.thumbnail book.title book.author 
                      <li key = {book.id}>
                        <Book bookUrl = {book.imageLinks && book.imageLinks.thumbnail}
                         bookTitle = {book.title} 
                         bookAuthors = {book.authors && book.authors}
                         bookOptionHandler = {bookShelfChangeListner}
                         bookID = {book.id}
                         bookShelf = {book.shelf}
                        />
                      </li>
                    )}
    
                   
                    </ol>
                   )}
                  </div>
                </div>
        )
    }
}
export default BookShelf