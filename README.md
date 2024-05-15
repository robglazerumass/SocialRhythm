
# Social Rhythm

Social Rhythm is a social media platform catered for music lovers. The platform allows users to make an account and create posts about their favorite songs and artists. Users can follow friends, seeing what their friends have to say about current songs. Users can rate posts that they see with a like or dislike, along with leaving a comment on posts, sharing their opinions with others.


## How to Use the Project

### Features

- Account Creation
- Post Creation
- Following other users 
- Commenting on posts 
- Liking or Disliking posts
- Liking or Disliking comments

This project functions as most social media platforms would. On entry to the site you can either login to your account or sign up to make a new account if you are a new user. Once you have logged in you can either make a post of your own by clicking 'create post' or you can scroll and view your friend's posts, liking or commenting on each by clicking on the respective buttons. Along with that you can click the search bar to search for a user and view their profile, where you can follow them to see their posts in your feed. 


## Tech Stack

**Frontend:** React, TypeScript, Vite, TailwindCSS, DaisyUI

**Backend:** Node, Express, Mongoose

**Database:** MongoDB

**Testing:** Jest

## Code Overview

The code is primarily split into two pieces, the Frontend and the Backend

### Backend
The Backend includes everything needed for the database, including schema and connection setup. Along with that it includes API endpoints that recieve and handle requests from the Frontend, along with custom Error handling. Finally the Backend contains unit tests that utilize jest to ensure that the code functions as needed. 

### Frontend
The Frontend is set up and runs in real-time in the development environment using Vite. It includes an interface for type declaring, the components folder that includes aspects of each feature, custom hooks, a service folder for authentication, notification pop-ups, etc., and a pages folder for each page. The routing system is included in the "main.tsx", which is also the file that Vite uses. 

## Run Locally
Before doing anything else make sure that you have git and npm installed on your local machine. Once that is complete continue with the following instructions:

Clone the project

```bash
  git clone https://github.com/robglazerumass/SocialRhythm.git
```

Go to the project directory

```bash
  cd SocialRhythm
```

You will need to open two terminal windows for the following two steps as you need to run both the frontend and backend independently

In the first terminal:

Go to the Backend directory

```bash
  cd Backend
```
Install Backend dependencies

```bash
  npm install
```
Create a .env file and include the enviroment variables mentioned in the Enviroment Variables section 
 
To run the Backend use:
```bash
  npm start
```
To build and open docs use:
```bash
  npm run docs
```
> **_NOTE:_**  *For Windows, use `npm run docs:windows`.*

In the second terminal:

Go to the Frontend directory 
```bash
  cd Frontend
```
Install Frontend dependencies

```bash
  npm install
```
To run the Frontend use:
```bash
  npm run dev
```
> **_NOTE:_**  *If an error occurs involving a missing module, delete the package-lock.json file and the node-modules directory and then run `npm install` again. After that try doing `npm run dev` and it should work.*

A link will appear in your terminal that you can follow to access the project. 

## Running Tests

To run tests, go the the Backend directory and run the following command

```bash
  npm test
```
> **_NOTE:_**  *For Windows, use `npm run test:windows`.*

## Environment Variables

To succesfully run this project, you will need to include the following environment variables to your .env file:

`DB_PASSWORD`

`SPOTIFY_CLIENT_ID`

`SPOTIFY_CLIENT_SECRET`

For security reasons the corresponding parts of each environment variable will remain hidden unless approved for use by an Author of the project. 

## Limitations and Known Bugs

1. Due to a lack of users and a small set of mock data we are not able to properly view the function of our project on a larger scale.
2. Some of the mock data within the database contain some discrepancies that cause the number of comments on some posts to be slightly off.
3. In its current state the like and dislike buttons do nothing on the frontend. The functionality exists on the backend but unfortunately no connection was made between the two.
4. When creating a post you will be able to play a preview of the song you are selecting to share. Unfortunately only some songs work for the preview and those that do will continue to play even after closing the window unless manually stopped or the end of the preview has been reached.
5. npm has a bug related to optional dependencies. This may result in an issue when following the steps to run the frontend. The error will involve a missing module but this can easily be resolved by remvoing both package-lock.json and the node_modules directory and trying npm install again.
 
## Authors

- [@RyanTavol](https://github.com/RyanTavol)
- [@lemanhstudy4111](https://github.com/lemanhstudy4111)
- [@cabouezzi](https://github.com/cabouezzi)
- [@emeka-ifejiagwa](https://github.com/emeka-ifejiagwa)
- [@gouweijan](https://github.com/gouweijan)
- [@hgudal](https://github.com/hgudal)
- [@robglazerumass](https://github.com/robglazerumass)
- [@aditiravi04](https://github.com/aditiravi04)

