# Milestone 4

This document should be completed and submitted during **Unit 8** of this course. You **must** check off all completed tasks in this document in order to receive credit for your work.

## Checklist

This unit, be sure to complete all tasks listed below. To complete a task, place an `x` between the brackets.

- [x] Update the status of issues in your project board as you complete them
- [x] In `readme.md`, check off the features you have completed in this unit by adding a ✅ emoji in front of their title
  - [x] Under each feature you have completed, **include a GIF** showing feature functionality
- [x] In this document, complete the **Reflection** section below

## Reflection

### 1. What went well during this unit?

In this unit, we got a lot of the functionality done to allow the user to create their budget and manually input data from their statement. Users can also now see every budget they have created through an endpoint that fetched all their created budgets and are able to select any of them to further edit them. 

### 2. What were some challenges your group faced in this unit?

A challenge we encountered was adding the Google oAuth, at first we struggled to figure out documentation. Once implementing it fully, we realized that now all our endpoints require a bearer token to function. It has been fun and challenging seeing all the moving parts that we must account for when implementing auth. 

### Did you finish all of your tasks in your sprint plan for this week? If you did not finish all of the planned tasks, how would you prioritize the remaining tasks on your list?

No, we did not get to finish all our tasks for this week, we ran into some obstacles attempting to figure out the system design for how the flow of creating a budget should go and started lagging behind on other features. Moving forward we will stay on tasks, and proceed even if we don't add every little detail we want and revisit it if we have time at the end. 

### Which features and user stories would you consider “at risk”? How will you change your plan if those items remain “at risk”?

The features at risk would be the monthly breakdown of the budget. This is due to the fact that managing user-created budgets can get complicated once they create multiple, and we need to implement a way to keep track of which ones are currently active and for which month. We will change this to show the last month instead of a yearly breakdown if needed to implement part of this feature.  

### 5. What additional support will you need in upcoming units as you continue to work on your final project?

In the upcoming units, we will need to time-manage better and find someone who has experience with our stack to ask questions and see if we are on the right path. This will help us as we are currently learning as we go and want to stay up to the highest "industry standards" as well as see if our data is structured appropriately for our end goal. 
