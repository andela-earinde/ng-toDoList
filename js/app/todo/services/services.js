//angular service to store the list data and retreive the list data

angular.module("todo")
    .factory("Data", [function(){
        var data = [];
        var list1 = "";

        return  {
        	list: function() {
        		return data;
        	},
        	add: function(items, type) {
        	  if(type.name === "high"){
        	      data.unshift(items);	
        	  }
        	  else if(type.name === "low") {
        	  	  data.push(items);
        	  }
              else
                  data.push(items);	
        	},
        	save: function(listName) {
	  	        localStorage.setItem(listName, JSON.stringify(data));
                data = JSON.parse(localStorage.getItem(listName));;
        	},
        	retreive: function(index, storedList) {
                 list1 = storedList[index];
                 data = JSON.parse(localStorage.getItem(list1));
                 return list1;
        	},
        }
    }]);