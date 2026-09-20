# Frontend Mentor - REST Countries API with color theme switcher solution (React Refactor)

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). 

This project started as a vanilla TypeScript and DOM manipulation project. I later refactored the project into a React + TypeScrip application while keeping the main features and existing data layer.

The purpose of this project was to practice taking an existing application and changing its structure to use React concepst instead of manually manipulating the DOM.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview | What I Built

The application allows users to:

- View a list of countries
- Search for a country by name
- Filter countries by region
- Click a country to view more details
- View population, region, sub-region, capital, currencies, languages, and top-level domains
- View border countries
- Click a border country to view its details
- Switch between light and dark mode
- Save the user's theme preference in local storage
- Navigate between pages without traditional full-page reloads


## The Orginal Project

The first version of this project was built with:

- Vite 
- TypeScript
- HTML
- Tailwind CSS
- DOM manipulation
- REST Countries API/data

The original application used files such as:

theme.ts
types.ts
errorHandler.ts
details.ts
apiService.ts
renderCountries.ts
index.ts

The application manually found HTML elements with methods such as:

`document.getElementById()`

and created or changed HTML with methods such as:

`document.createElement()`

It also used event listeners such as:

`addEventListener()`

## React Refactor
Instead of manually changing the DOM, I refactored the application to use React components, state, hooks, and React Router.

The goal was to keep the application's main features while changing the way the application is organized and rendered.

<b>Before</b>

The vanilla TypeScript version worked more like this:

User interacts with page
        ↓
JavaScript finds HTML element
        ↓
Event listener runs
        ↓
JavaScript changes the DOM
        ↓
New information appears

<b>After</b>

The React version works more like this:

User interacts with page
        ↓
React event handler runs
        ↓
State changes
        ↓
React re-renders the necessary UI
        ↓
Updated information appears

This refactor helped me understand the difference between manually manipulating the DOM and allowing React to manage the user interface based on state.

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![](./design/screenshot.png)


### Links

- Solution URL: [https://github.com/essencenroberts/rest-countries-api]
- Live Site URL: [https://restcountriesapi2026.netlify.app/]


### Built with

- Semantic HTML5 markup
- Vite
- TypeScript
- Tailwind CSS v4
- Mobile-first workflow
- [REST Countries API](https://restcountries.com) (v5, authenticated)

### Architecture Decisions
This project pulls country data from two different places:

  - **Homepage** reads from a local `data.json` file within the project. It loads instantly.
  - **Detail page** fetches live from the REST Countries API when a user clicks a country card, using the country's alpha-3-code rather than its name.

  I defined to separate TypeScript types for the project: Country for the homepage list and CountryDetail for the live API response

  I created the custom error classes (` ApiRequestError`, `CountryNotFoundError` ) to distinguish between a failed network request and a request that worked but found nothing.



### What I learned

I got real practice working with API that requires authentication from the browser, environment variables in VITE (import.meta.env.VITE_*), and the specific CORS behavior of allowlisted origins.

A few times I typed a field a caertain way based on what i assumed the API would return, and it turned out to be wrong. For example, I assumed `currencies` and `langiages` were objects but they're actually arrays. I only caight this by logging a real response from the API and comparing it side by side with what I had written.

With Refactoring one of the biggest things I learned was the difference between vanilla DOM manipulation and React.

In the original project, I had to tell JavaScript exactly what HTML element to find and what to change.

In React, I can store information in state and describe what the UI should look like based on that state.

I also learned that refactoring does not necessarily mean rewriting everything. Some existing code, such as the data service and TypeScript types, could continue to be used while the UI architecture changed.


#### Reflection

### Useful resources

- [MDN - Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - Explains why `fetch()` doesn't reject on a bad status code (like a 404) and why you have to check `response.ok` yourself
- [MDN - Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/URLSearchParams) - used this to read the `?code=BEL` part off the URL on the dtail page instead of writing my own string-splitting logic.
- [TypeScript Handbook - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) - helped to refresh on interfaces, optional properties (`?`), and union types
- [Tailwind CSS v4 docs - Dark mode](https://www.tailwindcss.com/docs/dark-mode) -this is what showed me i needed the `@custom-variant dark` in my CSS for toggle to work


## Author

- Website - [Essence Portfolio](https://essence-portfolio.netlify.app/)
