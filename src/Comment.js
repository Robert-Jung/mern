import React, { Component } from 'react'
import style from './style'
import marked from 'marked'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state={
      author: '',
      text: ''
    }
    this.deleteComment = this.deleteComment.bind(this)
  }

  deleteComment(e) {
    e.preventDefault()
    let id = this.props.uniqueID
    this.props.onCommentDelete(id)
    console.log('oops deleted')
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString())
    return { __html: rawMarkup }
  }

  render() {
    return (
      <div style={ style.comment }>
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
        <a style={ style.updateLink } href='#' onClick={ this.deleteComment }>delete</a>
      </div>
    )
  }
}

export default Comment
