# Todolist
Todo List with MEAN stack


## Setup

#### Serveur
- Install dependancy `npm i`
- Run MongoDb on 27017 port without user name and password ( You can change it on app.js )
- Run app.js `$ nodemon app.js`, if you not use nodemon run `$ node app.js`
- Listen 3050 port

#### Client
- Go to client folder `cd client/`
- Install dependancy  `npm i`
- Run application `ng serve` and open your browser on http://localhost:4200

***

## API
- GET - '/user' =>  send all user 
- POST - '/login/user' => need userName and password // send user info + generated token
- POST - '/user' => need userName, email and password for register
- PUT - '/user/:id' => need userId param, todo name and todo due date for add new todo and add todo id on user collection
- GET - '/user-todo' => send all user with todo reference

- GET - '/todo/:id' => need todoId param for get todo
- PUT - '/todo/:id' => need todoId param, todo name, todo due date and todo completed for update todo ( validate todo or update name / due date )
- DELETE - '/todo/:id' => need todoId param for delete todo ( delete todo reference in user collection too )
