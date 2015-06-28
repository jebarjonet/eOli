# eOli
**A webservice to find create places to go out in Paris from a custom database of places, linked to each other throught their types**

The main force of this project is that even if the user asks for a restaurant and a bar, **there are "links" between places categories suggesting him sometimes other kind of places, such as a night club after the bar, or to take a coffee before the restaurant.**

There is also a random element in the search algorithm proposing different places / ideas of places each new search.

## Content

- [Preview](#preview)
- [Usage](#usage)
- [Technologies](#technologies)
- [Installation](#installation)
- [Administration flow](#administration-flow)
- [Known issues](#known-issues)

## Preview
![](https://cloud.githubusercontent.com/assets/4401230/8396311/2b360e40-1da1-11e5-857b-d28d9cc67beb.png)

## Usage
The user selects some moods corresponding to its mind right now :

![](https://cloud.githubusercontent.com/assets/4401230/8396322/61719c5e-1da1-11e5-9e39-89dafc8dcc1c.png)

Here we selected "with some people", "hungry" and "wants to party", then we selected "Tonight". Then we press "Go".

![](https://cloud.githubusercontent.com/assets/4401230/8396323/6373c8ba-1da1-11e5-905f-7296c875f77c.png)

According to my geolocation we have some places we could go to corresponding to what we asked.


## Technologies

- [AngularJS 1.4](https://angularjs.org/)
- [NodeJS](https://nodejs.org/) - ExpressJS
- [MongoDB](https://www.mongodb.org/) - Mongoose
- [Gulp](http://gulpjs.com/)
- [Leaflet](http://leafletjs.com)
- Google+ API
- [MapBox](https://www.mapbox.com/)

## Installation
- Make sure you have NodeJS installed
- Make sure MongoDB is running
- Make sure those dependencies are installed globally :
    - bower
    - gulp
    - nodemon
- Go on [Google Developers Console](https://console.developers.google.com/), create a project and activate `Google+ API`
- Copy `server/config/parameters.js.dist` to `server/config/parameters.js` and edit its content according to the server
- Copy `public/app/services/parameters.js.dist` to `public/app/services/parameters.js` and edit its content according to your MapBox api key
- Run `bower install`
- Run `npm install`
- Run `node ./command/createUser.js -e YOUR_GOOGLE_EMAIL_ADDRESS`, it will create you an administrator account you will be able to access it through the Google connection system on it
- Run `gulp` (watch task can be launched with `gulp watch`, adding watchers to the default behavior)
- Run `nodemon`
- Go to `http://localhost:3000/#/admin` and create categories, periods, places, moods, etc.
- You then may want to run `node ./command/generatePlaces.js -q 8000`, it will generate 8000 places (`-q` then amount of places you want to generate) with a random category, dispatched randomly through Paris. `c` will clean the current places you have in database and replace them by new. **You need to have at least a category in your database before running it.**

![](https://cloud.githubusercontent.com/assets/4401230/8396314/3b1718f4-1da1-11e5-9d9c-7ed78dc5fbc2.png)

## Administration flow
### Periods
The search can be done at certain periods of the day, let's define them here like "Morning", "Noon", "Afternoon", etc.

![](https://cloud.githubusercontent.com/assets/4401230/8396359/43fe9ee6-1da2-11e5-87ce-352903fa64a3.png)

### Categories
Places belong to categories.

![](https://cloud.githubusercontent.com/assets/4401230/8396353/3ef1ca9a-1da2-11e5-913c-b0488c6e9288.png)

### Moods
Moods are selected by the user, we need to relate them to categories belonging to those moods.

![](https://cloud.githubusercontent.com/assets/4401230/8396357/42d53dae-1da2-11e5-871e-d79c1f8fe21c.png)

### Links
Links create a relation between two categories according to the period of the day. We put there a more or less arbitrary value to this relation at a period of the day between 0 and 100, 0 meaning there is no relation and 100 meaning there is a very strong relation between them. 

![](https://cloud.githubusercontent.com/assets/4401230/8396356/415d3f8a-1da2-11e5-959d-4567339732af.png)

### Places
Places are unique places proposed to the user while searching.

![](https://cloud.githubusercontent.com/assets/4401230/8396361/465165ca-1da2-11e5-8d4b-113a80e7ea8d.png)

![](https://cloud.githubusercontent.com/assets/4401230/8396360/451a77e6-1da2-11e5-961e-647b483419b3.png)

## Known issues
- The "complete address with Google" button in Places administration does not work, it was originally using the `Google Places API` to retrieve geolocation data from a place (like starting to write "Tour Eiffel" then clicking this button should autocomplete its address, latitude and longitude) but Google limited text search for Google Places API to 100 maximum request per day for the free usage, so I did not implemented it because it was not a so nice idea then :(

