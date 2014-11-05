var myApp = angular.module('githubList', []);

myApp.controller('GithubProject', ['$scope', '$http',  '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll) {
    $scope.loadJsonGithub = function(){
		$http.get('https://api.github.com/users/elasticsearch/repos?per_page=100')
		  .success(function(data) {
		     $scope.listProjects = [];
				angular.forEach(data, function(value, key) {
				  $scope.listProjects.push({
				  	'name':data[key].name, 
				  	'stars':data[key].stargazers_count, 
				  	'forks':data[key].forks, 
				  	'contributors':data[key].watchers,
				  })
				  $http.get('https://api.github.com/repos/elasticsearch/'+data[key].name+'/commits?per_page=100')
				  	.success(function(commit){
				  		$scope.listProjects[key].commits = commit
				  })
				});
		});
    }
    $scope.changeContent = function(project){
    	$scope.newContent = project;
    	$scope.currentCommitsPage = 1;
    	$scope.showCommits = true;

    	$location.hash('top');
        $anchorScroll();
    }
    $scope.init = function(){
		$scope.loadJsonGithub();
		$scope.showCommits = false;
		$scope.currentCommitsPage = 1;
		$scope.commitsLength = 20;


	}
	$scope.init()
}]);