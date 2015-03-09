angular.module("ToDo", []).
      controller("TodoController", ["Data",function(Data){

	  this.data = Data.list();

	  this.todo = {}

	  this.text = "";

	  this.msg = false;

	  this.listmsg = false;

	  this.listName = "";

	  this.storedList = [];

	  this.priority = [{name: "high"},
	                    {name: "low"}];

	  this.myPrior = this.priority[1].name;

	  this.addTodo = function() {
	  	 if(this.text){
	  	    this.todo.text = this.text;
	  	    this.todo.complete = false;
	  	    this.todo.completed = "not completed";
	  	    this.todo.warning = "warning";
	  	    this.com = false;
	  	    this.todo.date = new Date().getTime();
	  	    this.todo.hideText = false;
	  	    this.todo.hideInput = true;
	  	    this.todo.hideSave = true;
	  	    this.todo.hideEdit = false;
	  	    Data.add(this.todo, this.myPrior);
	  	    this.todo = {};
	  	    this.text = "";
	  	 }
	  	 else {
	  	 	this.msg = true;
	  	 }
	  }

	  this.toFalse = function() {
	  	  this.msg = !this.msg;
	  }

	  this.off = function() {
	  	  this.listmsg = !this.listmsg;
	  }

	  this.toClass = function(to) {
	  	  to.com = !to.com;
	  	  if(to.warning === "warning") {
	  	  	  to.warning = "success";
	  	  	  to.completed = "completed"
	  	  }
	  	  else if(to.warning === "success") {
	  	  	  to.warning = "warning";
	  	  	  to.completed = "not completed";
	  	  }
	  }

	  this.removeList = function(to, index) {
	  	  if(this.data.length === 1 || index === 0){
	  	  	 this.data.shift();
	  	  }
	  	  this.data.splice(this.data.indexOf(to), this.data.indexOf(to));
	  }

	  this.uncompleted = function() {
	  	  var count = 0;
	  	  angular.forEach(this.data, function(to){
	  	  	count += to.complete ? 0 : 1;
	  	  });
	  	  return count;
	  }

	  this.clearAll = function() {
	  	  this.data = [];
	  	  localStorage.clear();
	  	  document.location.reload();
	  }

	  this.clearList = function() {
	      this.data = [];
	  }

	  this.saveList = function() {
	  	if(!(/\w.\s\w.|^\s|\s$|^$/.test(this.listName))){
	  	   Data.save(this.listName);
	  	   this.data = Data.list();
	  	   document.location.reload();
	  	}
	  	else {
	  		this.listmsg = true;
	  	}
	  }

	  this.createList = function() {
	  	if(!(/\w.\s\w.|^\s|\s$|^$/.test(this.listName))){
	  	   Data.save(this.listName);
	  	   this.data = Data.list();
	  	}
	  	else {
	  		this.listmsg = true;
	  	}
	  }

	  this.reList = function(index) {
	  	   this.listName = Data.retreive(index, this.storedList);
	  	   this.data = Data.list();
	  }

	  this.hideWindow = function(to) {
	      to.hideText = true;
	      to.hideInput = false;
          to.hideSave = false;
          to.hideEdit = true;
	  }

	  this.saveWindow = function(to) {
	      to.hideText = false;
	      to.hideInput = true;
	      to.hideSave = true;
	      to.hideEdit = false;
	  }

	  for (i = 0; i < localStorage.length; i++){
          key = localStorage.key(i);
          this.storedList.push(key);         
      }

}]);