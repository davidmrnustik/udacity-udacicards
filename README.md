# UdaciCard Project

This is final assessment project for Udacity's React Native course.

## App

Udacity app allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks. App has implemented notification functionality that reminds users to study if they haven't already for that day.

## Install / Run

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

* `yarn install`
* `yarn start`
* `npm` can be used in place of `yarn`

### Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

#### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```
#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

## Project improvements beyond a basic version

* Added Redux and redux logger
* Validating forms with redux-form