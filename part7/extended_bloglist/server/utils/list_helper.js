const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}
const totalLike = (blogs) => {
    const total = blogs.reduce((acc, blog) => acc + blog.likes, 0)
    return total
}
const favoriteBlog = (blogs) => {
    let maxVlogCount = -1
    let maxIndex = -1
    blogs.forEach((blog, i) => {
        if (blog.likes > maxVlogCount) {
            maxIndex = i
            maxVlogCount = blog.likes
        }
    })
    return {
        title: blogs[maxIndex].title,
        author: blogs[maxIndex].author,
        likes: blogs[maxIndex].likes
    }
}

const mostBlogs = (blogs) => {
    const authorArray = _.chain(blogs)
        .groupBy('author')
        .map((value, key) => {
            return {
                author: key,
                value
            }
        })
        .value()
    const res = authorArray.reduce(
        (acc, item) => {
            if (item.value.length > acc.blogs) {
                return { author: item.author, blogs: item.value.length }
            }
            return acc
        },
        { author: '', blogs: -1 }
    )
    return res
}

const mostLikes = (blogs) => {
    const authorArray = _.chain(blogs)
        .groupBy('author')
        .map((value, key) => {
            return {
                author: key,
                likes: value.reduce((acc, blog) => acc + blog.likes, 0)
            }
        })
        .value()
    const res = authorArray.reduce(
        (acc, item) => {
            if (acc.likes < item.likes) {
                return item
            }
            return acc
        },
        { author: '', likes: -1 }
    )
    return res
}

module.exports = {
    dummy,
    totalLike,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
