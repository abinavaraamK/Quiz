var mainAppValue = angular.module('mainApp', [ 'ui.bootstrap', 'ngRoute',
		'ngSanitize', 'ngAnimate' ]);
var i, j, k;
i = j = k = 0;
var politicsAnswer = [];
var cricketAnswer = [];
var footballAnswer = [];
var correctcricketans = 0;
var correctgeneralans = 0;
var correctfootballans = 0;
var CAns = [];
var PAns = [];
var FAns = [];
var wrongAnswerC = [];
var wrongAnswerF = [];
var wrongAnswerP = [];
var answerJson;
var quizJson;

mainAppValue.service('ButtonValue', function() {
	/*
	 * var value={ isDisabled1:false, isDisabled2:false, isDisabled3:false };
	 * return { getButtonValue1:function(){ return value.isDisabled1; },
	 * getButtonValue2:function(){ return value.isDisabled2; },
	 * getButtonValue3:function(){ return value.isDisabled3; },
	 * setButtonValue1:function(isDisabled1){ value.isDisabled1=isDisabled1;
	 * return true; }, setButtonValue2:function(isDisabled2){
	 * value.isDisabled2=isDisabled2; return true; },
	 * setButtonValue3:function(isDisabled3){ value.isDisabled3=isDisabled3;
	 * return true; } };
	 */

	this.isDisabled1 = false;
	this.isDisabled2 = false;
	this.isDisabled3 = false;

	this.getButtonValue1 = function() {
		return this.isDisabled1;
	};
	this.getButtonValue2 = function() {
		return this.isDisabled2;
	};
	this.getButtonValue3 = function() {
		return this.isDisabled3;
	};
	this.setButtonValue1 = function(val) {
		this.isDisabled1 = val;
	};
	this.setButtonValue2 = function(val) {
		this.isDisabled2 = val;
	};
	this.setButtonValue3 = function(val) {
		this.isDisabled3 = val;
	};
});

mainAppValue.factory('shareName', function() {
	var playerName = null;

	return {
		setPlayerName : function(name) {
			playerName = name;
		},
		getPlayerName : function() {
			return playerName;
		}
	};

});

mainAppValue.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/Login', {
		templateUrl : 'LoginPage.html',
		controller : 'LoginController'
	}).when('/Main', {
		templateUrl : 'MainPage.html',
		controller : 'MainController'
	}).when('/Cricket', {
		templateUrl : 'CricketQuestions.html',
		controller : 'CricketController'
	}).when('/Football', {
		templateUrl : 'FootballQuestions.html',
		controller : 'FootballController'
	}).when('/Politics', {
		templateUrl : 'PoliticsQuestions.html',
		controller : 'PoliticsController'
	}).when('/Result', {
		templateUrl : 'ResultPage.html',
		controller : 'ResultController'
	}).otherwise({
		redirectTo : '/Login'
	});
} ]);
mainAppValue
		.controller(
				'LoginController',
				[
						'$scope',
						'$location',
						'shareName',
						function($scope, $location, shareName) {
							var len = '';
							$scope.inputText = function() {
								console.log("inside type text");
								console.log($scope.playerName.length);
								len = $scope.playerName.length;
								$scope.errorMessage = '';
							};
							$scope.submitButton = function() {
								console.log("inside submit");
								if ($scope.playerName) {
									shareName.setPlayerName($scope.playerName);
									console.log(name);
									$location.path('/Main');
								} else {
									$location.path('/Login');
									$scope.errorMessage = "Name field is required,should be > 3";
								}
								;
							};
						} ]);
mainAppValue
		.controller(
				'MainController',
				[
						'$scope',
						'ButtonValue',
						function($scope, ButtonValue) {
							$scope.isDisabled1 = ButtonValue.getButtonValue1();
							console.log("value");
							console.log($scope.isDisabled1);
							$scope.isDisabled2 = ButtonValue.getButtonValue2();
							$scope.isDisabled3 = ButtonValue.getButtonValue3();
							if (($scope.isDisabled1 | $scope.isDisabled2 | $scope.isDisabled3) == true) {
								console.log($scope.isDisabled1);
								console.log($scope.isDisabled2);
								console.log($scope.isDisabled3);
								$scope.submitButton = true;
							} else {
								$scope.submitButton = false;
							}
						} ]);

mainAppValue
		.controller(
				'CricketController',
				[
						'$scope',
						'$http',
						'$location',
						'ButtonValue',
						function($scope, $http, $location, ButtonValue) {
							$scope.SecondCard = false;
							$scope.title = "Cricket";
							$http
									.get('json/quiz.json')
									.success(
											function(json) {
												$scope.callNext = function() {
													if (i <= 5) {
														var myEl = angular
																.element(document
																		.querySelector('#MainCard'));
														myEl.remove();
														cricketAnswer
																.push($scope.radioValue);
														console
																.log("answer"
																		+ cricketAnswer);
														if (i == 5) {
															i = 6;
															throw new Error(
																	"got U");
														}
														$scope.SecondCard = true;
														$scope.question1 = json.category[0].cricket[0].questions[i].question;
														$scope.option1 = json.category[0].cricket[0].options[i].option1;
														$scope.option2 = json.category[0].cricket[0].options[i].option2;
														$scope.option3 = json.category[0].cricket[0].options[i].option3;
														$scope.option4 = json.category[0].cricket[0].options[i].option4;
														$scope.radioValue = false;
														i++;
													} else {
														console
																.log("cricket ansuwers");
														console
																.log(cricketAnswer
																		.join());
														ButtonValue
																.setButtonValue1(true);
														$location.path('/Main');
														console.log(quizJson);
														return true;
													}
												};
											});
						} ]);
mainAppValue
		.controller(
				'FootballController',
				[
						'$scope',
						'$http',
						'$location',
						'ButtonValue',
						function($scope, $http, $location, ButtonValue) {
							$scope.SecondCard = false;
							$scope.title = "Football";
							$http
									.get('json/quiz.json')
									.success(
											function(json) {
												$scope.callNext = function() {
													if (j <= 5) {
														var myEl = angular
																.element(document
																		.querySelector('#MainCard'));
														myEl.remove();
														footballAnswer
																.push($scope.radioValue1);
														console
																.log("answer"
																		+ footballAnswer);
														if (j == 5) {
															j = 6;
															throw new Error(
																	"got U");
														}
														$scope.SecondCard = true;
														$scope.question1 = json.category[0].football[0].questions[j].question;
														$scope.option1 = json.category[0].football[0].options[j].option1;
														$scope.option2 = json.category[0].football[0].options[j].option2;
														$scope.option3 = json.category[0].football[0].options[j].option3;
														$scope.option4 = json.category[0].football[0].options[j].option4;
														$scope.radioValue1 = false;
														j++;
													} else {
														ButtonValue
																.setButtonValue2(true);
														$location.path('/Main');
														return true;
													}
												};
											});
						} ]);
mainAppValue
		.controller(
				'PoliticsController',
				[
						'$scope',
						'$http',
						'$location',
						'ButtonValue',
						function($scope, $http, $location, ButtonValue) {
							$scope.SecondCard = false;
							$scope.title = "Political";
							$http
									.get('json/quiz.json')
									.success(
											function(json) {
												$scope.callNext = function() {
													if (k <= 5) {
														var myEl = angular
																.element(document
																		.querySelector('#MainCard'));
														myEl.remove();
														politicsAnswer
																.push($scope.radioValue2);
														console
																.log("answer"
																		+ politicsAnswer);
														if (k == 5) {
															k = 6;
															throw new Error(
																	"got U");
														}
														$scope.SecondCard = true;
														$scope.question1 = json.category[0].general[0].questions[k].question;
														$scope.option1 = json.category[0].general[0].options[k].option1;
														$scope.option2 = json.category[0].general[0].options[k].option2;
														$scope.option3 = json.category[0].general[0].options[k].option3;
														$scope.option4 = json.category[0].general[0].options[k].option4;
														$scope.radioValue2 = false;
														k++;
													} else {
														ButtonValue
																.setButtonValue3(true);
														$location.path('/Main');
														return true;
													}
												};
											});
						} ]);
mainAppValue
		.controller(
				'ResultController',
				[
						'$scope',
						'shareName',
						'$http',
						'ButtonValue',
						function($scope, shareName, $http, ButtonValue) {
							$scope.name = shareName.getPlayerName();
							console.log($scope.name);
							console.log("before splicing");
							console.log(cricketAnswer);
							console.log(politicsAnswer);
							console.log(footballAnswer);
							cricketAnswer = cricketAnswer.slice(1);
							politicsAnswer = politicsAnswer.slice(1);
							footballAnswer = footballAnswer.slice(1);
							console.log("after splicing");
							console.log(cricketAnswer);
							console.log(politicsAnswer);
							console.log(footballAnswer);
							$scope.cricket = ButtonValue.getButtonValue1();
							$scope.football = ButtonValue.getButtonValue2();
							$scope.politics = ButtonValue.getButtonValue3();
							$http.get('json/answers.json').success(
									function(json) {
										json = JSON.stringify(json);
										json = JSON.parse(json);
										answerJson = json; 
										console.log("answerJson");
										console.log(answerJson);
										calculateScore(json,$scope.cricket,$scope.football,$scope.politics);
									});
							$http.get('json/quiz.json').success(
									function(json) {
										json = JSON.stringify(json);
										json = JSON.parse(json);
										quizJson = json; 
										console.log("quizJson = json;");
										console.log(quizJson );
									});
							console.log($scope.cricket);
							console.log($scope.football);
							console.log($scope.politics);
							$scope.getInfo = function() {
								console.log("inside ");
								$("#nameSpan").tooltip({
									container : 'body',
									html : true,
									/* trigger: 'manual', */
									placement : 'bottom',
									title : "It's YoU",
								}).tooltip('show');
							};
							function calculateScore(json, cricket, football,
									politics) {
								console.log("inside calculateScore");
								console.log(cricket);
								console.log(football);
								console.log(politics);
								var j;
								for (j = 0; j < 5; j++) {
									if (cricket) {
										if (json.answers[0].cricket[j].one == cricketAnswer[j]) {
											CAns.push("images/Cricket-Ball.png");
											correctcricketans++;
										} else {
											wrongAnswerC.push(j);
											CAns.push("images/X.png");
										}
									}
									if (football) {
										if (json.answers[0].football[j].three == footballAnswer[j]) {
											FAns.push("images/fut-bal.png");
											correctfootballans++;
										} else {
											wrongAnswerF.push(j);
											FAns.push("images/X.png");
										}
									}
									if (politics) {
										if (json.answers[0].general[j].two == politicsAnswer[j]) {
											PAns.push("images/Political_img.png");
											correctgeneralans++;
										} else {
											wrongAnswerP.push(j);
											PAns.push("images/X.png");
										}
									}
								}
								$scope.cricketScore = CAns;
								$scope.politicsScore = PAns;
								$scope.footballScore = FAns;
							};
							$scope.getQueAns = function(index, value) {
								console.log("answerJson");
								console.log(answerJson);
								console.log('quizJson');
								console.log(quizJson);
								var answerKey = '';
								if (value === "cricket") {
									var wrongIndex = wrongAnswerC
											.includes(index);
									answerKey = "one";
									$scope.dirValue = value;
								} else if (value === "football") {
									var wrongIndex = wrongAnswerF
											.includes(index);
									answerKey = "three";
								} else if (value === "general") {
									var wrongIndex = wrongAnswerP
											.includes(index);
									answerKey = "two";
								} else {
									var wrongIndex = 0;
								}
								console.log("wrongIndex ", wrongIndex);
								console.log("inside QueAns", index);
								console.log("value of the hovered div ", value);
								if (wrongIndex) {
									$scope.showWrongQ = true;
									console.log(quizJson.category[0]);
									console.log(quizJson.category[0][value]);
									console.log(quizJson.category[0][value][0]);
									que = quizJson.category[0][value][0].questions[index].question;
									$scope.one = quizJson.category[0][value][0].options[index].option1;
									$scope.two = quizJson.category[0][value][0].options[index].option2;
									$scope.three = quizJson.category[0][value][0].options[index].option3;
									$scope.four = quizJson.category[0][value][0].options[index].option4;
									ans = answerJson.answers[0][value][index][answerKey];
									console.log("inside wrong value", ans);
									console.log("inside wrong value", que);
									$scope.Question = que;
									$scope.Answer = "Correct Answer :" + ans;
								} else {
									$scope.showWrongQ = false;
								}
							};
						} ]);

mainAppValue.directive("myCustomDir", function() {

	return {
		
		restrict : "E",
		
		Controller : "ResultController",
		
		templateUrl	: "wrongQuestions.html"
		
		
			
	};
});