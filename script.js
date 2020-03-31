angular.module('myApp', []).controller('appCtrl', ['$scope', function($scope) {

	$scope.score = 0;
	$scope.isDisabled = false;
	$scope.gameOverMessage = null;
	$scope.scoreMessage = null;

        $scope.hideQuestion = function() {
		document.getElementById('question').style.display = 'none';
		$scope.otherCountry = null;
		$scope.figureToCompare = null;
	}

        $scope.compare = function(figure) {
		document.getElementById('gameOver').style.display = 'none';
		$scope.figureToCompare = figure
		$scope.otherCountry = getRandomCountryExcept($scope.currentCountry);
		document.getElementById('question').style.display = 'block';
	}

        $scope.checkChosenCountry = function(chosenCountry, otherCountry) {
		var currentValue = chosenCountry[$scope.figureToCompare];
		var otherValue = otherCountry[$scope.figureToCompare];
		if(currentValue >= otherValue) {
			$scope.score++;
		}
		else {
			var fraction = otherValue / currentValue
			$scope.gameOverMessage = "No, the " + $scope.makeFigurePretty($scope.figureToCompare) + " of " + otherCountry.name + " is " + fraction.toFixed(2) + " times larger.";
			$scope.scoreMessage = "Game over. Your final score is " + $scope.score + ".";
			document.getElementById('gameOver').style.display = 'block';
			$scope.score = 0;
		}
		$scope.currentCountry = $scope.otherCountry;
		$scope.hideQuestion();
	}

        $scope.chooseCurrentCountry = function() {
		$scope.checkChosenCountry($scope.currentCountry, $scope.otherCountry);
	}

        $scope.chooseOtherCountry = function() {
		$scope.checkChosenCountry($scope.otherCountry, $scope.currentCountry);
	}

$scope.makeFigurePretty = function(figure) {
	if(figure == 'lifeExpectancy')
		return 'life expectancy';
	else if(figure == 'gdp')
		return 'GDP';
	else
		return figure
}
	$scope.hideQuestion();
	$scope.currentCountry = getRandomCountryExcept(null);
}]);

var getRandomCountryExcept = function(country) {
	while(true)
	{
		var index = Math.floor(Math.random() * countries.length);
		var randomCountry = countries[index];
		if(randomCountry != country) {
			return randomCountry;
		}
	}
}
