/**
 * Your slackbot token is available as the global variable:

process.env.SLACKBOT_TOKEN

 * When deployed to now.sh, the URL of your application is available as the
 * global variable:

process.env.NOW_URL

 * The URL is useful for advanced use cases such as setting up an Outgoing
 * webhook:
 * https://github.com/howdyai/botkit/blob/master/readme-slack.md#outgoing-webhooks-and-slash-commands
 *
 */


//  var Botkit = require('botkit');

var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: process.env.SLACKBOT_TOKEN
})
bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});


//call list of channels

/*
bot.api.channels.list({'exclude_archived' : 1}, function (err, res) {
    console.log(res);
});
*/

// basic hellos and responses

controller.hears(['hey'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Did you say my name?');
});



controller.hears(['damn'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Ya talkin ta me??');
});

controller.hears(['howdy'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'HOWDY');
});

//call list of users

bot.api.users.list({},function(err,response) {
	 console.log(response);

	});


//conversations about seasons with conditional answers

controller.hears(['seasons'], ['mention'], function(bot,message) {

  // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {

    convo.ask('Which season do you prefer?',[
      {
        pattern: 'winter',
        callback: function(response,convo) {
          convo.say('No winter lasts forever, no spring skips it\'s turn. One kind word can warm three winter months.');
          convo.next();
        }
      },
      {
        pattern: 'summer',
        callback: function(response,convo) {
          convo.say('And so with the sunshine and the great bursts of leaves growing on the trees, just as things grow in fast movies, I had that familiar conviction that life was beginning over again with the summer.');

          // next level
          convo.ask('Do you like swimming at the beach?',[
		  	{
		        pattern: 'yes',
		        callback: function(response,convo) {
		          convo.say('Me too. Nothing like swimming in the summer ocean..');
		          // do something else...
		          convo.next();
		        }
		      },
		            {
		        pattern: 'no',
		        callback: function(response,convo) {
		          convo.say('I know! Too much sand in the undies!');
		          // do something else...
		          convo.next();
		        }
		      },

		      {
		        default: true,
		        callback: function(response,convo) {
		          // just repeat the question
		           convo.ask('I\'m sorry? Just answer yes or no');
		          convo.repeat();
		          convo.next();
		        }
		      }
		    ]);
			//end next level

          convo.next();

        }
      },
      {
        pattern: 'autumn',
        callback: function(response,convo) {
          convo.say('On a bare branch a crow is perched - autumn evening');
                    // next level
	          convo.ask('Do you prefer red, yellow or purple?',[
			  	{
			        pattern: 'red',
			        callback: function(response,convo) {
			          convo.say('Autumn leaves turn fiery-red in an attempt to store up as much goodness as possible from leaves and soil before a tree settles down for the winter.');
			          // do something else...
			          convo.next();
			        }
			      },
			     {
			        pattern: 'yellow',
			        callback: function(response,convo) {
			          convo.say('The colour yellow usually means it\'s not that serious.');
			          // do something else...
			          convo.next();
			        }
			      },
			      {
			        pattern: 'purple',
			        callback: function(response,convo) {
				      convo.say('If Bacchus ever had a color he could claim for his own, it should surely be the shade of tannin on drunken lips, of John Keats purple-stained mouth, or perhaps even of Homers dangerously wine-dark sea.');

// 			          convo.say('If Bacchus ever had a color he could claim for his own, it should surely be the shade of tannin on drunken lips, of John Keat's 'purple-stained mouth', or perhaps even of Homer's dangerously wine-dark sea.');
			          // do something else...
			          convo.next();
			        }
			      },


			      {
			        default: true,
			        callback: function(response,convo) {
			          // just repeat the question
			           convo.ask('I\'m sorry? Just answer yes or no');
			          convo.repeat();
			          convo.next();
			        }
			      }
			    ]);
				//end next level

          convo.next();
        }
      },
            {
        pattern: 'spring',
        callback: function(response,convo) {
          convo.say('Spring is nature\'s way of saying, Let\'s party!');
          // do something else...
          convo.next();
        }
      },

      {
        default: true,
        callback: function(response,convo) {
          // just repeat the question
           convo.ask('Huh?');
          convo.repeat();
          convo.next();
        }
      }
    ]);

  })

});

// a conversation about sandwiches


controller.hears(['sandwiches'], ['mention'], function(bot,message) {
    askFlavor = function(response, convo) {
      convo.ask('What kind of sandwich do you want?', function(response, convo) {
        convo.say('Awesome.');
        askSalad(response, convo);
        convo.next();
      });
    }
    askSalad = function(response, convo) {
      convo.ask('What salads would you like?', function(response, convo) {
        convo.say('Ok.')
        askSauce(response, convo);
        convo.next();
      });
    }
    askSauce = function(response, convo) {
      convo.ask('Do you need some sauce on that?', function(response, convo) {
        convo.say('Ok! I will start getting it ready.');
        convo.next();
      });
    }

    bot.startConversation(message, askFlavor);
});


// a conversation about star wars

controller.hears(['star wars'], ['mention'], function(bot,message) {
    askFlavor = function(response, convo) {
      convo.ask('Are you allied with the empire or rebellion?', function(response, convo) {
        convo.say('Great choice, warrior. You are a member of ' + response.text  + '.' + ' ' + 'I can help you.');
        askSize(response, convo);
        convo.next();
      });
    }
    askSize = function(response, convo) {
      convo.ask('What kind of ship do you want?', function(response, convo) {
        convo.say('Oh, really? Hmm');
        askFighter(response, convo);
        convo.next();
      });
    }
    askFighter = function(response, convo) {
      convo.ask('What size do you need? A small fighter or cruiser?', function(response, convo) {
        convo.say('I guess I could arrange that for you to collect past sundown. Over at the old Tatooine dockyard. But lets keep it on the low.')
        askDroid(response, convo);
        convo.next();
      });
    }

    askDroid = function(response, convo) {
      convo.ask('Do you need a droid?', function(response, convo) {
        convo.say('Ok. Pick one out from the back then. Hurry and may the force be with you.');
        convo.next();
      });
    }

    bot.startConversation(message, askFlavor);
});


// asking and then storing the name of a user through conversation



controller.hears(['who am I though', 'who am i'], ['mention'], function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'You are that damn ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('You tell me!');
                    convo.ask('What is your name?', function(response, convo) {
                        convo.ask('Really?  You are' + " " + response.text + '?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {

                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {

                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, user.name + 'huh?');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Very well. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {

                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});


//using the users list to respond to questions



/*
controller.hears(['Who is danh?'], ['mention'], function(whichBot, message) {

	bot.api.users.list({},function(err,response) {

	 whichBot.reply(message, response.members[8].name + " is " + response.members[8].real_name + " " + "who lives in " + response.members[8].tz_label);

	})
});
*/


controller.hears(['Who is amysimmons?'], ['mention'], function(whichBot, message) {

	bot.api.users.list({},function(err,response) {

	 whichBot.reply(message, response.members[8].name + " is " + response.members[1].real_name + " " + "who lives in" + " " + response.members[1].tz_label);

	})
});

//trying to get draw the member names from the users.list through a for loop (FAILED! for loop didnt print)

bot.api.users.list({},function(err,response) {
	console.log("Answer: " + response.members[5].name)

	for(i = 0; i < response.members.length; i ++ ) {

		controller.hears(["Who is " + response.members[i].name + "?"], ['mention'], function(whichBot, message) {
			var realName = response.members[i]
			console.log(response.members[i].name);

			whichBot.reply(message, response.members[i].real_name );
		})
	};
});




// find the number of users in the list


/*
bot.api.users.list({},function(err,response) {

 console.log("number of users: " + response.members.length);

});
*/

//trying to print out the name of the users from the list, and printing out  & changing the color of the associated user (FAILED!!)

controller.hears(['What color danh'], ['mention'], function(whichBot, message) {


	bot.api.users.list({},function(err,response) {


		var textColor = response.members[8].color
		var theColor = response.members[8].color.value
		console.log(theColor)

/*
		console.log("color: " + textColor);
		textColor.style.color = 'blue';
*/
// 		textColor = textColor.fontcolor('blue');

		 whichBot.reply(message, response.members[8].real_name + " " + "is" + " " + textColor);

	})
});

