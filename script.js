// Code goes here

angular.module('InstagramApp',['ngAnimate'])
.controller('InstagramCtrl', function($scope, $http) {
  $scope.tag = "";
  $scope.message = null;
  
  $scope.clear = function(){
    $scope.tag = "";
    $scope.images = {};
    $scope.message = null;
  };

  $scope.searchText = function(text) {
    var url = "https://api.instagram.com/v1/tags/"+$scope.tag+"/media/recent";
    var config = {
      params:{'callback': 'JSON_CALLBACK','client_id': '9a1d76df4385474cbd8fb315e4d80505','count': 15}
    };

    $http.jsonp(url, config)
    .success(function(results) {
      if(results.meta.code == 200){
        if(results.data.length > 0){
          $scope.images = results.data;
          $scope.message = "Found " +results.data.length+ " results tagged with '" + $scope.tag+ "' ...";
        }
      }
    })
    .error(function() {
      $scope.message = "Error";
    });
  };
});