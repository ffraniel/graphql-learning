import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';
import {flowRight as compose} from 'lodash';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    }
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  displayAuthors (){
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option disabled>Loading Authors</option>);
    } else {
      return data.authors.map(author => {
          return (
            <option key={author.id} value={author.id} >{author.name}</option>
          );
        })
    }
  }

  submitForm (e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    });
    this.setState({
      name: "",
      genre: "",
      authorId: ""
    });
  }

  render (){
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} />
        </div>
        <div className="field">
          <label>Genre</label>
          <input type="text" name="genre" value={this.state.genre} onChange={this.changeHandler}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={this.changeHandler} name="authorId">
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);