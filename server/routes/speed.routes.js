/* jslint node: true */
/* global require, module */
'use strict';

function calculateAge(birthMonth, birthDay, birthYear)
{
  var todayDate = new Date();
  var todayYear = todayDate.getFullYear();
  var todayMonth = todayDate.getMonth();
  var todayDay = todayDate.getDate();
  var age = todayYear - birthYear; 

  if (todayMonth < birthMonth - 1) {
    age--;
  }

  if (birthMonth - 1 == todayMonth && todayDay < birthDay) {
    age--;
  }
  return age;
}

module.exports = function (app) {

//	app.route('/api/users')
//		.get(users.list)
//		.post(users.create);
	app.route('/api/name')
		.get( function (req, res){
			res.json({'name' : 'Max John Maybury'});
		})

	app.route('/api/age')
		.get( function (req, res){
			res.json({'age' : calculateAge(2,19,1994)});
		})

	app.route('/api/location')
		.get( function (req, res){
			res.json({'location' : 'Bracknell'});
		})

	app.route('/api/hackathon/first')
		.get( function (req, res){
			res.json({'hackathon' : 'Real World Studios Hack'});
		})

	app.route('/api/hackathon/last')
		.get( function (req, res){
			res.json({'hackathon' : 'HackLondon'});
		})

	app.route('/api/jobs')
		.get( function (req, res){
			res.json([{'company' : 'Techex', 'startDate' : 'July 2014', 'endDate' : 'July 2015'}, {'company' : 'Gabble', 'startDate' : 'June 2013', 'endDate' : 'May 2014'}]);
		})

//	// Finish by binding the user middleware
//	app.param('userId', users.userById);
};
