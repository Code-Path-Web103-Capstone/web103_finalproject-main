# gobudget.it

CodePath WEB103 Final Project

Designed and developed by: Heider Delgado, Juan Gomez

🔗 Link to deployed app: https://client-production-b286.up.railway.app/

## About

### Description and Purpose

Gobudget is an app that helps you manage your finances. It allows you to create budgets, track your expenses, and see your spending habits. The app is designed to be simple and easy to use so that you can focus on your finances without the hassle.

### Inspiration

Every month we get a bank statement or a credit statement, and we see how much we spent, but we don't really know where all that money went. We wanted to create an app that helps you track your expenses and see where your money is going. You can see how much comes in and goes through an intuitive interface that visualizes income, expenses, debt, savings, and more.

## Tech Stack

Frontend: React Vite

Backend: Python and Express

## Features

### Baseline Features!

- [X] The web app includes an Express backend app and a React frontend app.

![reactexpress.gif](gifs%2Freactexpress.gif)
- [X] The web app includes dynamic routes for both frontend and backend apps.

![dinamic routes.gif](gifs%2Fdinamic%20routes.gif)

- [X] The web app is deployed on Railway with all pages and features working.

![railwai deploy.gif](gifs%2Frailwai%20deploy.gif)


#### Backend Features 

- [X] The web app implements at least one of each of the following database relationship in Postgres:
- * [X] One-to-many
![one_to_many.png](gifs%2Fone_to_many.png)
- * [ ] many-to-many with a join table
- [X] The web app implements a well-designed RESTful API that:
-  * [X] Can respond to at least one of each type of request: GET, POST, PATCH, and DELETE.
![GETPATCHDELPOST.gif](gifs%2FGETPATCHDELPOST.gif)
- * [X] Implements proper naming conventions for routes.
![GETPATCHDELPOST.gif](gifs%2FGETPATCHDELPOST.gif)
- [X] The web app implements the ability to reset the database to its default state.
![reset database.gif](gifs%2Freset%20database.gif)

#### Frontend Features 

- [X] The web app implements at least one redirection. 
- ![one redirection.gif](gifs%2Fone%20redirection.gif)
- [X] The web app implements at least one interaction that the user can initiate and complete on the same page without navigating to a new page.
![interaction](https://github.com/user-attachments/assets/b1697ee1-81bd-4b57-be6a-540dff293e03)
- [X] The web app uses dynamic frontend routes created with React Router.
- [X] The web app uses hierarchically designed React components:
![routes](https://github.com/user-attachments/assets/4f25ba85-dc01-4945-91e5-d8191f30c72e)
- * [X] Components are broken down into categories, including page and component types.
- * [X] Corresponding container components and presenter components as appropriate.
![Components](https://github.com/user-attachments/assets/4444be1b-fc23-47c6-8ca2-dc9e66373414)



#### Custom Features (MUST complete TWO)

- [X] The web app gracefully handles errors.
- [ ] The web app includes a one-to-one database relationship.
- [x] The web app includes a slide-out pane or modal as appropriate for your use case.
![modal](https://github.com/user-attachments/assets/80ea0ae3-fdd9-4b06-9d73-9ccd0d196443)
- [ ] The web app includes a unique field within the join table.
- [ ] The web app includes a custom non-RESTful route with corresponding controller actions.
- [x] The web app allows filtering and/or sorting as appropriate for your use case.
![filtering](https://github.com/user-attachments/assets/85922e9b-1ba9-4109-87e6-6b201eaedbd5)
- [ ] Data is automatically generated in response to a certain event or user action. Examples include generating a default inventory for a new user starting a game or creating a starter set of tasks for a user creating a new task app account.
- [ ] Data submitted via a POST or PATCH request is validated before the database is updated.

### Additional Features

#### The user can create an account through various auth options

- [X] The user can create an account through email:password or sign-in through a Google.

![loginwithgoogle.gif](gifs%2Floginwithgoogle.gif)


#### The user can input a PDF Bank/Credit Statement 

- [X] The user should be able to upload their bank statement in PDF format and the site will parse and input their spending automatically. 

![parserfull.gif](gifs%2Fparserfull.gif)

#### The user can create a budget plan

- [X] The user can easily set and update their budget plan, choosing from their custom-created plan or selecting alternative plans.

![createbudget.gif](gifs%2Fcreatebudget.gif)


#### The user has a budget dashboard

- [X] This dashboard allows the user to see their current budget, expenses, and spending habits divided by time periods (default set to monthly).

![dashboard.gif](gifs%2Fdashboard.gif)


#### The user can see spending by category

- [x] The user should be able to see spending categories on a monthly timeframe.

![expenses](https://github.com/user-attachments/assets/7d6c405d-3ebf-47c5-8d04-c18a324685bb)



#### The user can see a previous history of it's budgets

- [x] The user can see a previous history of his created budgets.

![Kapture 2024-11-21 at 02 24 35](https://github.com/user-attachments/assets/32034fa7-f10c-41b6-adb6-2c33ea9443f3)



## Installation Instructions

The deployed app can be found here: https://client-production-b286.up.railway.app/

[instructions go here]
