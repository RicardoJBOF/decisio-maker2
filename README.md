# Decision Maker 2

Decision Maker (Decider) 2 is an app in which registered users can create a poll with multiple choices. Visitors can vote in the survey ranking their preferences. Then, the results are classified using the Borda Count method.

This is an upgraded version of Decision Maker, my midterm project from the coding Bootcamp at Lighthouse Labs.

## Final Product

![Screenshot Create View 1](https://github.com/RicardoJBOF/decision-maker2/blob/master/docs/Create-View1.png)
![Screenshot Create View 2](https://github.com/RicardoJBOF/decision-maker2/blob/master/docs/Create-View2.png)
![Screenshot Survey View](https://github.com/RicardoJBOF/decision-maker2/blob/master/docs/Survey-View.png)
![Screenshot Result View](https://github.com/RicardoJBOF/decision-maker2/blob/master/docs/Result-View.png)
![Screenshot Admin View](https://github.com/RicardoJBOF/decision-maker2/blob/master/docs/Admin-View.png)

## Dependencies
- Express
- Node 10.x or above
- NPM 5.x or above
- jQuery
- AJAX
- PG 6.x
- Bcrypt
- Body-parser
- EJS 2.6.2 or above
- Mailgun.js
- Node-sass-middleware

## Getting Started

- Install dependencies using the `npm install` command.
- Reset database using `npm run db:reset`.
- Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
- Go to <http://localhost:8080/> in your browser.

## Requirements

- Registered users can create a poll with multiple choices
- When a poll is finished being created, the creator is given two links: an administrative link (which lets them access the results) and a submission link (which the user sends to their friends)
- The links are also sent to the creator via email (using mailgun)
- When a user visits the submission link, they see a list of the choices for that poll. The visitor can rank the choices and then submits the poll
- The results are ranked using the Borda Count method, and only the creator can access the result page
- It must have an Admin page where users can check all the polls that they created




















