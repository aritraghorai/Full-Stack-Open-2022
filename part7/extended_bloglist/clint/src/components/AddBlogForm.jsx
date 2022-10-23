/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useAddBlogsMutation } from '../Redux/Api/blogApi'

const AddBlogForm = () => {
  const [addNewBlog, { data, isLoading, isSuccess }] = useAddBlogsMutation()
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
    addNewBlog(newBlogState)
    setnewBlogState({ title: '', author: '', url: '' })
  }
  return (
    <form onSubmit={addBlogSubmitHandler} className="mt-4">
      <div className="title  flex gap-9 my-1 items-center">
        <span className="font-bold text-xl">Title</span>
        <input
          className="border-2 border-black outline-none rounded p-1"
          type="text"
          name="title"
          id="title"
          value={newBlogState.title}
          onChange={onChangeHandler}
        />
      </div>
      <div className="author flex gap-3 my-1 items-center">
        <span className="font-bold text-xl">Author</span>
        <input
          className="border-2 border-black outline-none rounded p-1"
          type="author"
          name="author"
          id="author"
          value={newBlogState.author}
          onChange={onChangeHandler}
        />
      </div>
      <div className="author flex gap-10 my-1 items-center">
        <span className="font-bold text-xl">URL</span>
        <input
          className="border-2 border-black outline-none rounded p-1"
          type="url"
          name="url"
          id="url"
          onChange={onChangeHandler}
          value={newBlogState.url}
        />
      </div>
      <button
        type="submit"
        id="createBlog"
        className="border-2 px-2 py-1 my-1 border-blue-500 rounded"
      >
        create
      </button>
    </form>
  )
}

export default AddBlogForm
