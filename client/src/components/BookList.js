import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

class BookList extends Component {

  displayBooks () {
    var data = this.props.data;
    if (data.loading) {
      return (<h3>Loading Books..</h3>)
    } else {
      return (
        data.books.map(book=> {
          return (
            <li key={book.id}>{book.name}</li>
          )
        })
      )
    }
  }

  render (){
    return (
      <div>
        <ul id="book-list">
          <li>Book name here</li>
          {this.displayBooks()}
        </ul>
        
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);