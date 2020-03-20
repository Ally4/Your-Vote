# Your-Vote
-------------------------------------------------

### Description

This application is going to help the citizen to vote for their own leaders without putting in a lot of effort, such as displacement or waiting on a queu, they are going to vote digitally.

### Badges

[![Build Status](https://travis-ci.com/Ally4/Your-Vote.svg?branch=develop)](https://travis-ci.com/Ally4/Your-Vote) [![Coverage Status](https://coveralls.io/repos/github/Ally4/Your-Vote/badge.svg?branch=develop)](https://coveralls.io/github/Ally4/Your-Vote?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/c0e2051f7d7446195f95/maintainability)](https://codeclimate.com/github/Ally4/Your-Vote/maintainability)

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

## DOCUMENTATION
-------------------------------------------------
https://documenter.getpostman.com/view/7168800/SzS7PkcD?version=latest


## The endpoints

|     Methods       |     Endpoints                   |      Details                                                                               | 
|-------------------|---------------------------------|---------------------------------------------------------------------------------------------|
|GET                |  `/`                            |User should be able to register in the   system                                              |
|POST               |  `/api/v1/auth/signup`          |User should be able to register in the   system                                              |
|POST               |  `/api/v1/auth/signin`          |User should be able to log in the system                                                     |
|PATCH              |  `/api/v1/:partyid`             |Admin should be able to edit the political party                                             |
|POST               |  `/api/v1/parties`              |Admin should be able to register a political party                                           |
|POST               |  `/api/v1/petitions`            |Admin, user or politician should be able to post a petition to challenge the  results        |
|POST               |  `/api/v1/offices`              |Admin should be able to register a political party                                           |
|GET                |  `/api/v1/parties/:partyid`     |Admin, user or politician should be able to get a political party by id                      |
|GET                |  `/api/v1/offices/:officeid`    |Admin, user or politician should be able to get a political office by id                     |
|GET                |  `/api/v1/parties`              |Admin, user or politician should be able to get all registered political parties             |
|GET                |  `/api/v1/offices`              |Admin, user or politician should be able to get all registered political offices            | |POST               |  `/api/v1/candidates`           |Admin should be able to create a candidate                                                   |
|DELETE             |  `/api/v1/parties/:partyid`     |Admin should be able to delete a political party                                             |
|POST               |  `/api/v1/vote`                 |Admin should be able to delete a political party                                             |
|DELETE             |  `/api/v1/petitions/:petitionid`|Admin should be able to delete a political party                                             |
|DELETE             |  `/api/v1/offices/:officeid`    |Admin should be able to delete a political party                                             |
|GET                |  `/api/v1/office/:id/result`    |Admin should be able to delete a political party                                             |
|GET                |  `/api/v1/office/results`       |Admin should be able to delete a political party                                             |

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
