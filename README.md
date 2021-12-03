# Cyber Synergy Gap Questionnaire Prototype - FRONTEND

## Team Members
* Kiet
* Donika
* Ericka
* Priscella 

## About
This is the front end layout of the Cyber Synergy Gap Questionnaire Prototype.

## This demo contains the following elements (as of now):
* Registration
* Login Screen
* Dashboard (shows user's progress )
* Scrollable Question Pages for all 6 sections of level 1

## Installation Guide
1. Pull, Fork or Download this project and navigate into the root directory
2. Make sure the user have [Node.js](https://nodejs.org/en/download/) application installed
3. To install the dependencies, run
`npm install`
4. To start the prototype at http://localhost:3000/, run
`npm start`
5. Wait for a while for server to automatically deploy to http://localhost:3000/

## Dependencies (as of now)
* react
* react-bootstrap
* react-router-dom
* material-ui (mui)
* axios

## Project Structure
Root
### Essentials
* Index.js - Root file of the react application
* App.js - Contains all of the routes that is needed to run the website
### Parts of the website
* Dashboard.js - The dashboard of the user that displays the info to the user
* Login.js - The Login page
* Register.js - Where the user create a new account
* {Section}QuizPage.js - The scrollable page for the given section
* {Section}Menu.js - The menu for the given section
### Components
* QuestionComponent.js - Retrieve all questions from backend and map necessary values to a Question tag
* Question.js - The Question tag, used to handle types of questions, displaying and submitting them on change
* PopUp.js - Pop up on the top right of each page
* SideBar.js - The Navbar of the user, showing their email and roles

