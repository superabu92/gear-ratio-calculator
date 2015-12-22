// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('ctrl',function($scope,$ionicPopup,$ionicHistory){
	
	$scope.kF = function(){
	var bl = $scope.f / 100;
	var al = $scope.r / 100;
	var dE = $scope.eff / 100;
	var hl = $scope.cg;
	this.kf = ((bl + ($scope.cf * hl))/(1+($scope.max * hl))).toFixed(3);
	
	var alertPopup = $ionicPopup.alert({
     title: 'kF',
     template: this.kf
   });
   alertPopup.then(function(res) {
     console.log('testing kF');
   });
   return this.kf;
	};
	
	$scope.kR = function() {
	var bl = $scope.f / 100;
	var al = $scope.r / 100;
	var dE = $scope.eff / 100;
	var hl = $scope.cg;
	this.kr = ((al - ($scope.cf * hl))/(1-($scope.max * hl))).toFixed(3);
	
	var alertPopup = $ionicPopup.alert({
     title: 'kR',
     template: this.kr
   });
   alertPopup.then(function(res) {
     console.log('Testing kR');
   });
	};
	
	$scope.lgFwd = function() {
	var bl = $scope.f / 100;
	var al = $scope.r / 100;
	var hl = $scope.cg;
	this.kf = ((bl + ($scope.cf * hl))/(1+($scope.max * hl))).toFixed(3);
	var dE = $scope.eff / 100;
	var kf = this.kf;
	this.lgFwd = (((kf * $scope.tyre)/(dE * $scope.engine)) * $scope.max * $scope.mass * (9.81)).toFixed(2);
	
	var alertPopup = $ionicPopup.alert({
     title: 'Low Gear FWD',
     template: this.lgFwd
   });
   alertPopup.then(function(res) {
     console.log('Testing lgFwd');
   });
	};
	
	$scope.lgRwd = function() {
	var bl = $scope.f / 100;
	var al = $scope.r / 100;
	var hl = $scope.cg;
	this.kr = ((al - ($scope.cf * hl))/(1-($scope.max * hl))).toFixed(3);
	var kr = this.kr;
	var dE = $scope.eff / 100;
	this.lgRwd = (((kr * $scope.tyre)/(dE * $scope.engine)) * $scope.max * $scope.mass * (9.81)).toFixed(2);
	
	var alertPopup = $ionicPopup.alert({
     title: 'Low Gear RWD',
     template: this.lgRwd
   });
   alertPopup.then(function(res) {
     console.log('Testing lgRwd');
   });
	};
	
	$scope.hGear = function() {//highgear
	var hGear = (($scope.rpm * $scope.tyre * 3.14)/(($scope.vMax)*30)).toFixed(2);
	this.hgear = hGear;
	
	var alertPopup = $ionicPopup.alert({
     title: 'High Gear',
     template: this.hgear
   });
   alertPopup.then(function(res) {
     console.log('Testing highGear');
   });
	};
	
	$scope.fwdCgp = function() {//fwdCgp
	
	this.fwdCgp = (Math.pow((this.lgFwd/this.hgear),(1/4))).toFixed(2);
	
	var alertPopup = $ionicPopup.alert({
     title: 'FWD CGP',
     template: this.fwdCgp
   });
   alertPopup.then(function(res) {
     console.log('Testing highGear');
   });
	};
	
	$scope.rwdCgp = function() {//rwdCgp
	
	this.rwdCgp = (Math.pow((this.lgRwd/this.hgear),(1/4))).toFixed(2);

	var alertPopup = $ionicPopup.alert({
     title: 'RWD CGP',
     template: this.rwdCgp
   });
   alertPopup.then(function(res) {
     console.log('Testing highGear');
   });
	};
	
	$scope.gear = function() {//fwd gear ratio
	
	var e = document.getElementById("selectGear");
	var sGear = e.options[e.selectedIndex].value;
	var sGear = parseInt(sGear);
	var c = [];
	var x;
	
	document.write("FWD Gear Ratio");
	 for(var i = 1;i<=sGear;i++)
	{
		document.write("<div class='row'>");
		if( i == 1)
		{
			c[i] = (this.fwdCgp * (Math.pow($scope.k,-1.5))).toFixed(3);
			document.write("<div class='col'>Gear "+i+"</div><div class='col'>" + c[i] + "</div>");
		}
		else{
			x = i-1;
			c[i] = (c[x] * $scope.k).toFixed(3);
			document.write("<div class='col'>Gear "+i+"</div><div class='col'>" + c[i] + "</div>");
		}
		document.write("</div>");
			
	} 
	document.write("<br><br><br><br>RWD Gear Ratio");
		 for(var ir = 1;ir<=sGear;ir++)
	{
		document.write("<div class='row'>");
		if( ir == 1)
		{
			c[ir] = (this.rwdCgp * (Math.pow($scope.k,-1.5))).toFixed(3);
			document.write("<div class='col'>Gear "+ir+"</div><div class='col'>" + c[ir] + "</div>");
		}
		else{
			x = ir-1;
			c[ir] = (c[x] * $scope.k).toFixed(3);
			document.write("<div class='col'>Gear "+ir+"</div><div class='col'>" + c[ir] + "</div>");
		}
		document.write("</div>");
			
	} 
	
	
	document.write("<input type='button' value='Reload Page' onClick='window.location.reload()'></button>");
	
	};
	

	
	
	
	
	
	
	
	
	$scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
	
	
	
	
	
	$scope.reset = function(){
		var elements = document.getElementsByTagName("input");
for (var ii=0; ii < elements.length; ii++) {
  if (elements[ii].type == "number") {
    elements[ii].value = "";
  }
}
		
	};
	
	
	
});
