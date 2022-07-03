# social-network-api

# User Story:
* AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

# Acceptance Criteria
* GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

# Description
* This is an application that was created as an API for a social media network. It utilizes a NoSQL database and it allows simple user functions. Such as the ability to add and delete users. Can also find users using the GET routes implemented in the code. 
It also has the ability to add friends and thoughts that can be reacted to. 

# Video Description: 
https://drive.google.com/file/d/1moMihvDoP7erk_Mmtfx9I_Z_W3kMTEpE/view
https://drive.google.com/file/d/1b6FBoXlSSu21OFySZ2cwUmGvGN5IOLok/view
