# HackerNews

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

My development versions:

- node version: v16.13.2
- npm version: 8.1.2
- nvm version: 1.1.7

# My Assumptions

• The web application should be compatible in any web browsers, different devices and screen sizes. It should be a responsive design.
• Core functionality is to shows the latest stories, no need to implement the login, user profile and comments.
• To provide a clean, modern design and highly readable UI
• Easy to use, reduce the unnecessary actions for user
• Adding some more features with my own decision based on target user's need, e.g. assist user to quickly browse and select the stories they want to read e.g. filter/search stories
• Enhance the performance with implementing a cache for different type of stories, so it doesn't need to fetch and load again
• Considering this a small scale of project, so I decide there is no need to use NgRx and lazy loading
• Need to show I am following best practice of Angular, e.g. logical file naming convention, clear folder structure, break down components, typescript with clear interfaces and avoid using type any etc.
• Writing test cases in Jasmine, aims for an optimal test coverage rate and keep it above 80%
• I choose Angular 13 as the version for the project, as the team mentioned this is their target version to be updated


## Typography:
**1. Header ***
	Georgia, Cambria, "Times New Roman", Times, serif
	These fonts offer a classic and formal aesthetic feeling, frequently use in news websites. Serif fonts are known for elegance, professionalism and readability, it is good for using as headings.
=***2. Sub Header and Body ***
	Open Sans, sans-serif
	This font is commonly use for body text in web design, Sans-serif are known for modern, clean and simple aesthetic as well as it is versatile and legible. Open Sans has a good balance of spacing, letterforms and x-height, which makes it easy to read on different devices and screen sizes.
	
In addition, I offer more margin, padding, line height and spacing in order to overcome the difficulty of readability comparing to the original frontpage
	
## Colour Usage:
*** Background Colour with #ffc017 ***
	It is a good bright yellow colour that can work well as a background colour in web design, it is
	bold and attention-grabbing colour that can be used to create a sense of energy, optimism, curiosity and excitement.
	WCAG 2.1 (Web Content Accessibility Guidelines) recommends a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (18pt or 14pt bold).
	Regarding to provide a clean visual feeling and consider with web accessibility, I mainly use white colour for the foreground content in order to make a good contrast. Overall, it is more easy to read, especially for people with visual impairments.
	
Implemented Features and Functionalities 

***1. Infinitive Scrolling on Stories with a back to top sticky button***
	I noticed the original one use a table and it shows 30 items only, and the user need to click  'more…' at the bottom in order to load another 30 stories, which isn't a handy experience.
	So I redesign the display of stories with a list of item with infinitive scrolling feature, the user just need to keep scrolling to see further more stories without extra actions, more easy to use!
***2. Cache for stories by Type***
	It helps for performance and waiting time 


## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng test --code-coverage` to check the test coverage report.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
