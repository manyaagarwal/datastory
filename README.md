#Social Story

## Inspiration
We were intrigued by the increase in the number of sexual harassment cases after the #MeToo movement. We decided to illustrate the data trends for each year, specifically to compare the statistics before and after the movement.

## What it does
Social Story is a web application that hopes to inform the public about the social issue of sexual harassment and how cases have risen as more people are speaking up about their story. Related data and visualizations for the U.S. is provided. As an open source project, there is a contribution form that logged-in users can access and add data for other countries from trusted sources they have found, specifically the country, the source, and CSV files. The data will be verified by the admins before being uploaded to the front-end application. 

## How I built it
We used React as the main front-end framework for our web application and hosted the database and media storage on Google Firebase. After rendering a world map, we allow navigation to a country of choice, where the sexual harassment data for that country will be shown. We created a user authentication system and a contribution form that loads the information provided by an authenticated user to be stored in Firebase.

## Challenges I ran into
We had trouble working with asynchronous functions in Javascript and getting certain elements to render properly in the DOM. There were difficulties extracting the data from CSV files and storing them into the Firestore, as well as fetching those data from the database and displaying them visually (i.e tables, graphs, charts). We especially struggled with data visualization when attempting to use the D3 React library because of structuring the layouts.

## Accomplishments that I'm proud of
We managed to create our own authentication system and prohibit contribution to non-users. The data from the Firebase database was successfully fetched from our back-end and applied to our visualizations on the front-end.

## What I learned
We learned about integrating Google Firebase with our React app and how to interact with the Firestore and Storage from the front-end through APIs. We got more practice programming in Javascript and understood why Promises are so important to the functionality. 

## What's next for Social Story
Social Story depends hugely on public contributions. Our web application currently only features data on the United States, so we are announcing a call to action and raise awareness on sexual harassment statistics. We plan to scrape more data from various trusted sources and expand the data availability for all countries, not just the U.S. From there, we think we could integrate other social issues in relation to sexual harassment.
