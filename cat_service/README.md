# cat_service

A service about cats! Store information about cats, and retrieve it.

You'll need `node` to run it.

## Server

To run, just use `npm run`


## Client

The client has a few commands you can perform:

Command format: `npm run start {action} {data}`

### list

Lists all cats in the "database"

e.g.: `npm run start list`

### add

Adds a new cat. A cat has the following properties

1. name
2. type

e.g.: `npm run start add chestnut wirehair`


### get

Gets a cat based on its name.

e.g.: `npm start get chestnut`