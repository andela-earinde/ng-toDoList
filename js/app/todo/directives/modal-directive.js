angular.module("todo").
        directive("modal", function(){
        	return {
        		restrict: "E",
        		templateUrl: "js/app/todo/directives/modal-directive.html"
        	}
        });