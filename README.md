# Your-Vote
-------------------------------------------------

### Description

This application is going to help the citizen to vote for their own leaders without putting in a lot of effort, such as displacement or waiting on a queu, they are going to vote digitally.


## Repository
-------------------------------------------------
[Repository](https://github.com/Ally4/Your-Vote.git)

## Gh-pages
-------------------------------------------------
[GH-pages](https://ally4.github.io/Your-Vote/UI)

## Pivotaltracker
-------------------------------------------------
[Stories](https://www.pivotaltracker.com/n/projects/2437073)

## Heroku
-------------------------------------------------
[Heroku](https://vote4you.herokuapp.com/)


## The endpoints

|     Methods       |     Endpoints                  |      Details                                                                           | 
|-------------------|--------------------------------|---------------------------------------------------------------------------------------------|
|POST               |  `/api/v1/auth/signup`         |User should be able to register in the   system                                              |
|POST               |  `/api/v1/auth/signin`         |User should be able to log in the system                                                     |
|PATCH              |  `/api/v1/:partyid`            |Admin should be able to edit the political party                                             |
|POST               |  `/api/v1/parties`             |Admin should be able to register a political party                                           |
|POST               |  `/api/v1/petitions`           |Admin, user or politician should be able to post a petition to challenge the  results        |
|POST               |  `/api/v1/offices`             |Admin should be able to register a political party                                           |
|GET                |  `/api/v1/parties/:partyid`    |Admin, user or politician should be able to get a political party by id                      |
|GET                |  `/api/v1/offices/:officeid`   |Admin, user or politician should be able to get a political office by id                     |
|GET                |  `/api/v1/parties`             |Admin, user or politician should be able to get all registered political parties             |
|GET                |  `/api/v1/offices`             |Admin, user or politician should be able to get all registered political offices             | 
|POST               |  `/api/v1/candidates`          |Admin should be able to create a candidate                                                   |
|DELETE             |  `/api/v1/parties/:partyid`    |Admin should be able to delete a political party                                             |

## Setting up the system
### Prerequisites
1. Node.js

1. Postman

** Git clone `https://github.com/Ally4/Your-Vote.git` in the terminal, then **
1. Run `npm install`
1. Run `npm install nodemon`
1. Run `npm start` then check the endpoints in the postman
1. Application will run on http://localhost:9876

### Testing
Run `npm test`
___

> Regards to Andela

> Regards to our TTLs

> Regards to the teammates and their support

> Andela Stackup cycle 4

> &copy; NENGO Ally as the developer (2020)
