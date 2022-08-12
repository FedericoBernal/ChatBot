# Translation Web App Debugger

## Overview

This web app will help the user to verify the translations made by the Translation Bot. It can translate from/to all the supported languages by the Azure Cognitive service. Custom dictionaries are also supported on this app.

## Prerequisites

- An Azure subscription
- An Azure Cognitive resource deployed on Azure
- Optional: A custom dictionary already published

[Here](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-how-to-signup) is additional information on how to create the Cognitive or Translator service.

## Requirements

- [ReactJS](https://reactjs.org/)
  - [react-bootstrap](https://react-bootstrap.github.io/)
  - [react-dom](https://www.npmjs.com/package/react-dom)
  - [react-icons](https://www.npmjs.com/package/react-icons)
  - [react-loading-overlay](https://www.npmjs.com/package/react-loading-overlay)
  - [axios](https://github.com/axios/axios)
- [NodeJS](https://nodejs.org/es/)

All the `npm` modules are listed in the project's [package.json](package.json) file, thus, will be automatically installed when the solution is run.

## Settings

- REACT_APP_COGNITIVE_KEY=The value in the Azure secret key for the Translator's subscription.
- REACT_APP_COGNITIVE_REGION=The region of the multi-service or regional translator resource.
- REACT_APP_CATEGORY_DICTONARY=(Optional) The category dictionary is used to implement a custom dictionary for cognitive services and it is compounded by:
  - key: is the "fromLanguage-toLanguage". E.g.: "en-es"
  - categoryId: is the category Id for the custom dictionary
    For example:
        REACT_APP_CATEGORY_DICTONARY={ "en-es" : {"categoryID": "category-id"}}

## Running the web app

1.  If not already installed, download and install [NodeJS](https://nodejs.org/en/).
2.  Run the command `npm install` to install all the required dependencies.
2.  Configure the values for the `REACT_APP_COGNITIVE_KEY`, `REACT_APP_COGNITIVE_REGION`, and `REACT_APP_CATEGORY_DICTONARY` keys with the proper Translation service information.
3.  Run the solution locally by using the following command `npm start`.
4.  Make sure to disable your Ad Block extension or add a rule to ignore any URL starting with 'http://localhost'.

## How the web app works

- The user needs to insert a phrase in the left text area and choose the from/to language
- The web app will make an API call to the Translator API when the user click on the Translate button
- The response will be shown in the right text area
- The following buttons are available:
  - Translate: Translates a text
  - Invert: Inverts the from/to language
  - History: Shows or hides a panel with the latest translations
  - Clean: Clean the view
