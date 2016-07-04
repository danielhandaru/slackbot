# Javascript Project 1 - Slackbot

The aim of this project was to set up a number of Slackbot functions and behaviours within the Slack web app using the BotKit, and explore the forms of javascript programming possible within this platform.

# Basic Hellos and Responses

The first challenge was simply to have the selected bot give set responses when called. This would help us become familiar with the controller.hears method and how to pass in replies using the whichbot.reply. My next step after getting the bot to reply single sentences or words was to see if I could build a conversation within these constraints. I created a simple conversation based on 'Star Wars', called with 'star wars @bot'. The most limiting aspect was the lack of conditional answers, which meant that the bot's reply would be the same regardless of what the user's response was. I also built a simple conversation about 'Sandwiches'.

#Conditional answers

I discovered that the if/else statements in the Botkit could be carried out using pre-defined 'patterns', where the bot's answers would change depending on the user's input. You could build multiple levels of conversation and questioning, as long as the bot could make it clear what kind of response was required. It reminded me of the Choose Your Own Adventure books for kids. I wanted to create a small text adventure that the user could go on and complete (or fail) depending on their answers, but time was my enemy. Instead I built a conversation based on the seasons which would spit out literary responses based on the user's input. One important thing to remember was to also create the fallback 'else' statement in case the user inputted something unexpected. This was done by using 'default: true' at end of each conversation tree. This can be called with 'seasons @bot'

#asking and then storing the name of a user through conversation

One interesting thing to look at was how the bot could get and store information that the user had inputted. I tested this with a simple conversation where the bot would ask the user his name. The user was then guided through a pre-built conversation which would end in their name being stored. Afterwards, every time the user would ask the bot his name, the bot would reply using the stored information. The user's reply was stored in a variable called 'user.name'. This conversation can be called by typing either 'Who am i' or 'Who am i though' @bot.

#using users.list

The first challenge was to console log the actual users list, along with the rest of the information stored in it. After that was achieved and the list printed out in terminal on load, it was a matter of looking at the data provided and seeing in what way it could be manipulated. I created a simple function to print out certain user's full name from the user list if the bot was asked 'who is [nickname] ?' @bot along with their approximate location (or timezone actually!). I wanted to find a way of using a for loop to iterate through the array and match the nicknames in the list depending on user's input, but the function would not pick up my for loop for some reason and I was only able to use the list if I hard-coded the nicknames into the question. Both my attempts at hard-coding the nicknames and using the for loop are documented in the js.

I also had an idea to print out both the users name and the color which was associated with that user. I have no idea why, but each user had a hex associated to them in the array. I was able to print out 'full name' is '#hexcolor', but I wanted the #hexcolor to actually change to the selected colour by the bot. I tried a lot of different ways, including storing the textColor in a variable and changing the css of it another variable and taking the value of the #hex and passing that into a style.color function but nothing seemed to work! Maybe because the Slack app is not a website and the elements can't be manipulated using regular css? I have no idea. In any case, a few hours only got me part of the way there before I felt the urge to drop my laptop into the toilet, and that's when I knew I should go to bed and try it another time.

Another challenge was that sometimes for no apparent reason the bot would start acting crazy, spitting out lines twice in a row and going to parts of the conversation too early and strangely malfunctioning even though nothing much had recently changed in the js. I found that giving him a few hours of rest and coming back would solve it, so I'm not sure if it it was something I had done or if Slack simply acts up like that with too many changes.

