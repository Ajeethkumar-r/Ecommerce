import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync(123456, 10),
    isAdmin: true,
  },
  {
    name: 'ajeeth',
    email: 'ajeeth@example.com',
    password: bcrypt.hashSync(123456, 10),
  },
  {
    name: 'ranjith',
    email: 'ranjith@example.com',
    password: bcrypt.hashSync(123456, 10),
  },
]

export default users
