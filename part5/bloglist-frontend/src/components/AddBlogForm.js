/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { addBlog } from '../services/blogs'

const AddBlogForm = ({ addBlog }) => {
  const [newBlogState, setnewBlogState] = useState({
    title: '',
    author: '',
    url: ''
  })
  const onChangeHandler = (e) => {
    setnewBlogState({ ...newBlogState, [e.target.name]: e.target.value })
  }
  const addBlogSubmitHandler = async (e) => {
    e.preventDefault()
    addBlog(newBlogState)
    setnewBlogState({ title: '', author: '', url: '' })
  }
  return (
    <form onSubmit={addBlogSubmitHandler}>
      <div>
        title:
        <input
          type="text"
          name="title"
          id="title"
          value={newBlogState.title}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        author:
        <input
          type="author"
          name="author"
          id="author"
          value={newBlogState.author}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        url:
        <input
          type="url"
          name="url"
          id="url"
          onChange={onChangeHandler}
          value={newBlogState.url}
        />
      </div>
      <button type="submit" id="createBlog">
        create
      </button>
    </form>
  )
}

export default AddBlogForm
