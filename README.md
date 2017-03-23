# Productivity Backend
Productivity Application - Backend

## Installation

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/dhruv-kumar-jha/productivity-backend)


Just clone this repo
and then do `yarn install` or `npm install` to install all the dependencies.

After installing all the dependencies just run `yarn start:production` or `npm run start:production` and the server will start listening at the specified port.

You can update application config by either editing the config file `app/global/config/index.js` or by setting up the Environment variables.

example:

```
PORT=1337
SECRET_TOKEN="B57J=7B`NQ$y98|~5;hc715bo09^5oz8NR+]n9r~215B91Nd9P%25_N6r!GHcOKp|18y5-73Dr5^@9k7n]5l<-41D1o"
MONGODB="mongodb://fldsde8074:zxcvbn@ds0439839.mLab.com:29017/fldsde8074"
```


---

This is all that matters at the moment.

You can checkout the frontend code of this app at https://github.com/dhruv-kumar-jha/productivity-frontend


Todos:

- [x] Added functionality to make the board **publicly accessible**.
- [x] Add **Deploy to Heroku** button
- [x] Allow user to specify **Port Number** using Environment variables
- [x] Allow user to specify **Database Host** using Environment variables
- [x] Allow user to specify **Web Token Secret** using Environment variables
- [x] Create the project
- [x] Setup Mongoose and Mongoose Models
- [x] Setup GraphQL and its Types, Queries, Mutations and Resolvers.
- [x] Setup token based user authentication
- [x] Add token validation middleware for express


#### Maybe:

- [ ] Setup social authentication
- [ ] User passport for user authentication

