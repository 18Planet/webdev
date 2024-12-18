const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  likes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)

  return likes
}

const favoriteBlog = (blogs) => {
  favorite = blogs.reduce((fav, blog) => {
    if (fav === undefined) {
      return blog
    } else {
      return blog.likes > fav.likes ? blog : fav
    }
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = new Map()

  for (const blog of blogs) {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + 1)
    } else {
      authors.set(blog.author, 1)
    }
  }

  let maxValue = -Infinity;
  let maxKey = null;

  for (const [key, value] of authors.entries()) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
      console.log(value)
    }
  }


  return {author: maxKey, blogs: maxValue};
}

const mostLikes = (blogs) => {
  const authors = new Map()

  for (const blog of blogs) {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + blog.likes)
    } else {
      authors.set(blog.author, blog.likes)
    }
  }

  let maxValue = -Infinity;
  let maxKey = null;

  for (const [key, value] of authors.entries()) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
      console.log(value)
    }
  }


  return {author: maxKey, likes: maxValue};
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}