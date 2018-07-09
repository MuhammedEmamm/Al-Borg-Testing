(function () {
    'use strict';

    angular.module('app').controller('DetailedAmountController', DetailedAmountController);

    DetailedAmountController.$inject = ['$scope', '$rootScope', '$state', '$http','BASE_URL', 'HTTP_HEADERS','$cookies'];

    function DetailedAmountController($scope, $rootScope, $state, $http, BASE_URL, HTTP_HEADERS,$cookies) {
		var today = new Date() ; 
		var curmonth = today.getMonth() ; 
        var curyear = today.getFullYear() ; 
		$scope.role = $cookies.getObject('RoleName1');
			$('#mapDate').datepicker({
			    format: "mm-yyyy",
    startView: "months", 
    minViewMode: "months"
		}); ; 
		$scope.GetDetailedAmount = function(){
			
		$http({
				            
                method: 'POST',
                url: BASE_URL + '/Visit/GetDetailedAmount',
                data: {
                    "Month": curmonth,
					Year:curyear,
                    "RoleID": $cookies.getObject('RoleID1'),
                    "CompanyID": 15
                },
                headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                }
			}).then(function(response){
				if(response.data.IsSuccess){
					$scope.DetailedAmount = response.data.Response ; 
					document.getElementById('loadingDet').style.display = "none" ;
				}
			},
			function(response){
				//("ERROR") ; 	
			})	
		} ; 
		$scope.GetDetailedAmount() ;
		$scope.Getdate = function(){
			$scope.mapDate = document.getElementById('mapDate').value ; 
			$scope.month = $scope.mapDate.substring(0,2) ; 
			$scope.year = $scope.mapDate.substring(3,$scope.mapDate.length) ; 
			//($scope.month) ; 
			//($scope.year ) ; 
			$scope.GetDetailedAmount1  ($scope.month , $scope.year) ;
		} ; 
		
		$scope.GetDetailedAmount1 = function(x , y) {
			//("hena") ; 
			$http({
				            
                method: 'POST',
                url: BASE_URL + '/Visit/GetDetailedAmount',
                data: {
                    "Month": x,
					Year:y,
                    "RoleID": $cookies.getObject('RoleID1'),
                    "CompanyID": 15
                },
                headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                }
			}).then(function(response){
			//	//(response.data) ; 
				if(response.data.IsSuccess){
					$scope.DetailedAmount = response.data.Response ; 
					document.getElementById('loadingDet').style.display = "none" ;
					//(response.data) ; 
				}
			},
			function(response){
				//("ERROR") ; 	
			})	
		} ; 
		
	
    }
})();