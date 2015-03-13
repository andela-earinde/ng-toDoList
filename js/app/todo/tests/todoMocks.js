angular.module("todoMocks", [])
    .factory("Data", [function() {
    	var data = [
                         {text: "crap", complete: false, completed: "not completed",
                          warning: "warning", hideText: false, hideInput: true, hideSave: true,
                          hideEdit: false, com:false}
        		       ];
        return {
        	list: function() {
    	        return data;
            },
          
            add: function(items) {
                data.unshift(items);
            },

            save: function(items) {

            },
            
            retreive: function(index, list) {
                return "andela";
            }
        }
    }]);