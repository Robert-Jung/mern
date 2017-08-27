import React, { Component } from 'react'

class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }
  render() {
    return (
      <div>
        Comment Box Component
      </div>
    )
  }
}

export default CommentBox
