const notFound = (req, res, next) => {
  const error = new Error(`NOT FOUND - ${req.originalUrl}`) // when use wrong api to access our product
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode // if error arises as 200 then give as 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, //give me a stck of error while in developing mode
  })
}

export { notFound, errorHandler }
