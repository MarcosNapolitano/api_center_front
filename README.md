# <div align="center">Api Center Front</div>

This is a front end for my api endpoint. 

The original repo for the api's is [here](https://github.com/MarcosNapolitano/api_hub) and you can visit the site [here](https://marcosnapolitano.github.io/api_center_front/)! :rocket:

This is my first experience with react hooks, up to this point I have always used class components. The main hub acts as a big component whose state determines which *app* is rendered. The idea was to gather all my api's into one place so anyone can interact with them. The actual api's documentation is located in their original repo [here](https://github.com/MarcosNapolitano/api_hub). Here we will just cover the UI designed for their usage.

## Tech Stack

* HTML
* CSS
* React
* Vite - as local server and app starter.

## Quickview

![Screenshot of the site](https://marcosnapolitano.github.io/Assets/thumbnail2.jpg)

## Quickstart

*Make sure both node.js and npm are installed on your OS.*

1. Fork the project.
2. Clone project using `git clone git@github.com:<YOUR-USERNAME>/api_center_front.git`.
3. Navigate into the project using `cd api_center_front`.
4. Run `npm install` then `npm audit fix` (this is a Vite Server security issue).
6. Finally run `npm run dev`.
7. Now the app is running at `localhost:5173/api_center_front/`.


*Disclaimer: I'm using a personal kit from FontAwesome for both LinkedIn and Github's icons. I currently don't know if forking this repo without my FontAwesome's user will break this feature, but if that's the case, you have to set up said icons manually.*

## Docs

All logic contained in the `App` folder. It holds the components for each of the mini *apps*.

* Exercise Tracker: a mini database for storing exercises.
* Header Parser: displays the info sent in the http request header.
* Issue Tracker: a collection of user generated issues stored locally.
* Main Hub: the actual component that holds the app together.
* Metric Converter: a metric to imperial conversion system.
* Personal Library: a mini database for storing books and comments on them.
* URL Shortener: an URL conversion system.

The file called `manual_reset.js` is just an http form reseter. I have to contact the endpoint manually in order not to re-render the *app* and lose state of which *mini app* is being rendered at the moment. I found myself resetting forms all the time so it became a nice code reducer.

On the other hand, the file called `Link.jsx` contains the main link for the endpoint. If it were to change, this is the only file that needs updating. All apps access it via import.

The actual code is full of comments in order to help view what is going on.

## Final Notes

This site was deployed using [GitHub Pages](https://pages.github.com/). A workflow provided by Vite is included to build the app correctly.