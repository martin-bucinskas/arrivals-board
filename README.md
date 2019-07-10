[![CircleCI](https://circleci.com/gh/happysad-/arrivals-board.svg?style=svg&circle-token=d24be8de76346f125ccd004ed19143ee6ec8d2e0)](https://circleci.com/gh/happysad-/arrivals-board)

# Arrivals Board Application

This is a simple React application which registers to the TfL push API to get the latest
feed for the arrivals to the Great Portland Street underground station.

You can find this application running in a container on a server at http://188.166.170.128/.
Please allow the API to push an update, this usually takes about 15 seconds.

Arrivals-Board was bootstrapped with `create react app`. More on that can be found here: 
https://github.com/facebook/create-react-app.

## Installation
This project uses `.nvmrc` file to automatically select the NPM and NodeJS versions.
If you do not have Node Version Manager installed, you can omit the `nvm use` as long
as you have high enough NPM and NodeJS versions.

Item | Version
-----|--------
NVM | lts/carbon
NPM | 6.9.0
Node | v8.16.0

#### To install this locally:

```
git clone git@github:happysad-/arrivals-board.git
cd arrivals-board
nvm use
yarn install
```
This project was built with yarn package manager, building with NPM will work too,
however `yarn.lock` file will become useless.

#### To run locally:

```
yarn start
```

This will start the application on `localhost:3000`

## Configuration

You can specify which underground lines you want to receive updates for by adding or
removing them from the `tflApi.config.json` file. Essentially, you could populate
the list with other London underground stations as long as you know which lines are
present and if you know the stations naptan id.

## Testing

This project uses Jest, Mocha and Chai for unit and integration testing.
Cypress will be used to write integration and end to end testing.

#### To run the unit tests locally:

```
node_modules/.bin/jest
```

#### To run the cypress tests:

```
node_modules/.bin/cypress run
```

#### Code coverage
```
node_modules/.bin/jest --coverage
```

## Roadmap

Here are some of the ideas to be implemented in the future.

 - [ ] Northbound and Southbound trains
 - [x] Push API to prevent continous polling
 - [ ] Populate tflApi.config.json with extra stations
 - [x] Display the line colour next to the arrival time
 - [ ] Star your favourite train / time and keep tabs on it
 - [ ] Additional information about arriving train