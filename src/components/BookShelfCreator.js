import React , {Component} from 'react'
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
class BookShelfCreator extends Component
{
  static propTypes = {
    
    shelfList: PropTypes.array.isRequired,
    allBooks : PropTypes.array.isRequired,
    bookShelfChangeListner : PropTypes.func.isRequired
    }
    
    render()
    {

      const {shelfList,allBooks,bookShelfChangeListner}= this.props;




        return (

            shelfList.map( (shelf,index) => <BookShelf            
            shelfBooks = {allBooks.filter(book => book.shelf ===shelf.filterBookMethod)}
            bookshelfTitle={shelf.shelfTitle}
            bookShelfChangeListner={bookShelfChangeListner}
            key={index}
            />)
        
        )
    }
}
export default BookShelfCreator