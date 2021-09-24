import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //JWT_SECRET  is simply the info which we want to send
    expiresIn: '30d', //expire date here :30 days
  })
}

export default generateToken
