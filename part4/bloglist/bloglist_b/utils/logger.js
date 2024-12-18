const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.lerror(...params)
}

module.exports = {
  info, error
}