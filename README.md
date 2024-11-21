# gobudget.it

CodePath WEB103 Final Project

Designed and developed by: Heider Delgado, Juan Gomez

🔗 Link to deployed app:

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

#### Frontend Features 

- [X] The web app implements at least one redirection. 
- ![one redirection.gif](gifs%2Fone%20redirection.gif)
- [ ] The web app implements at least one interaction that the user can initiate and complete on the same page without navigating to a new page.
- [ ] The web app uses dynamic frontend routes created with React Router.
- [ ] The web app uses hierarchically designed React components:

- * [X] Components are broken down into categories, including page and component types.
- * [ ] Corresponding container components and presenter components as appropriate.


#### Custom Features (MUST complete TWO)

- [X] The web app gracefully handles errors.
- [ ] The web app includes a one-to-one database relationship.
- [ ] The web app includes a slide-out pane or modal as appropriate for your use case.
- [ ] The web app includes a unique field within the join table.
- [ ] The web app includes a custom non-RESTful route with corresponding controller actions.
- [ ] The web app allows filtering and/or sorting as appropriate for your use case.
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

#### The user can add recurring expenses

- [ ] Within the budget plan users can set recurring expenses such as rent, subscriptions, traveling fees, or savings account investments.

[gif goes here]


#### The user can filter spending by category

- [ ] The user should be able to see spending categories on a daily, weekly, monthly, or yearly timeframe.

[gif goes here]


#### The user can enable spending limit notifications 

- [ ] User can opt-in to receive SMS or email notifications when spending limits have been exceeded

[gif goes here]

#### The user can see a previous history of it's budgets

- [ ] The user can see a previos history of his created budgets.

[gif goes here]


## Installation Instructions

The deployed app can be found here: https://client-production-b286.up.railway.app/

[instructions go here]
