import bcrypt from 'bcryptjs' // we use 'bcryptjs' insteadof 'bcrypt' to avoid the dependencies messed up

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10), // to make our password secure we need to hash it using 'hashSync' function along with the bcrypt package
    isAdmin: true, //to verify the admin user
  },
  {
    //demo user
    name: 'ajeeth',
    email: 'ajeeth@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    //demo user
    name: 'ranjith',
    email: 'ranjith@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
