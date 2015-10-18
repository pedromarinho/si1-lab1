var app = angular.module("listaTema", []);

app.controller("listaTemaController", function($scope) {
	$scope.app = "Lista de temas";

	$scope.temas = [];

	$scope.inTemas = false;

	$scope.addTema = function(nomeTema){
		if(!temaInTemas(nomeTema)){
			$scope.temas.push({nome: nomeTema, aprendido: false});
		}else{
			console.log("tema repetido");
		}
				
	}

	$scope.removeTema = function(index){
		$scope.temas.splice(index,1);
	}

	$scope.moveTema = function(index){
		$scope.temas[index].aprendido = true;
	}

	var temaInTemas = function(nomeTema){
		for(var i = 0; i < $scope.temas.length; i++){
			if($scope.temas[i].nome == nomeTema){
				console.log($scope.temas[i]);
				$scope.inTemas = true;
				return true;
			}
		}$scope.inTemas = false;
	}
});