//jasmine specs

describe("Controller: TodoController using inline mock", function(){

	beforeEach(module("todo"));

	var todoCtr

	beforeEach(module("todoMocks"));

	beforeEach(inject(function($controller, Data){
		todoCtr = $controller('TodoController');

		data = Data;
	}));

	afterEach(function(){
		todoCtr = null;
	});

	it("should load mocked data", function() {
		expect(todoCtr.data).toEqual([
                    {text: "crap", complete: false, completed: "not completed",
                     warning: "warning", hideText: false, hideInput: true, hideSave: true,
                     hideEdit: false, com: false}
        ]);
	});

	describe("todoCtr.addTodo", function(){

		it("should set todoCtr.msg to true if the text is empty", function() {
			todoCtr.addTodo();

			expect(todoCtr.msg).toBeTruthy();
		});

		it("should add the message to the data service if the text is not empty", function(){
			todoCtr.text = "test";
			todoCtr.todo.text = "test";
	        todoCtr.todo.complete = false;
	        todoCtr.todo.completed = "not completed";
	        todoCtr.todo.warning = "warning";
	        todoCtr.todo.date = 1234;
	        todoCtr.todo.hideText = false;
	        todoCtr.todo.hideInput = true;
	        todoCtr.todo.hideSave = true;
	        todoCtr.todo.hideEdit = false;
	        todoCtr.todo.com = false;
           
			todoCtr.addTodo();

			expect(todoCtr.data).toEqual([
				    {text: "test", complete: false, completed: "not completed", date: 1234,
				     warning: "warning", hideText: false, hideInput: true, hideSave: true, 
				     hideEdit: false, com:false},

                    {text: "crap", complete: false, completed: "not completed",
                     warning: "warning", hideText: false, hideInput: true, hideSave: true,
                     hideEdit: false, com:false}
            ]);
		});
	});

    it("should remove a list from the data when the removeList function is called", function() {
    	todoCtr.removeList(todoCtr.data[0], 0);

    	expect(todoCtr.data).toEqual([]);
    });

    describe("todoCtr.toClass", function(){

    	it("should change the completed and warning property of the passed object", function(){
    		todoCtr.toClass(todoCtr.data[0]);

    		expect(todoCtr.data[0]).toEqual(
    		    {text: "crap", complete: false, completed: "completed",
				     warning: "success", hideText: false, hideInput: true, hideSave: true, 
				     hideEdit: false, com: true}    	
    		);
    	});

    	it("should change the completed and warning if object passed is 'success'", function(){
            todoCtr.data[0].warning = "success"

    		todoCtr.toClass(todoCtr.data[0]);

    		expect(todoCtr.data[0]).toEqual(
    		    {text: "crap", complete: false, completed: "not completed",
				 warning: "warning", hideText: false, hideInput: true, hideSave: true, 
				 hideEdit: false, com: true}    	
    		);
    	});
    });

    it("should return return the number of uncompleted list when the uncompleted function is called",
    	function(){
    		expect(todoCtr.uncompleted()).toEqual(1);
    });

    it("should clear the data when the clearList function is called", function(){
        todoCtr.clearList();

    	expect(todoCtr.data).toEqual([]);
    });

    it("should alter the data objects when the hideWindow function is called", function(){
    	todoCtr.hideWindow(todoCtr.data[0]);

    	expect(todoCtr.data[0]).toEqual(
            {text: "crap", complete: false, completed: "not completed",
		     warning: "warning", hideText: true, hideInput: false, hideSave: false, 
		     hideEdit: true, com: false}  
        );
    });

    it("should clear all data in the local storage when the clear all method is called", function(){
        spyOn(localStorage, "clear");
        
        todoCtr.clearAll();

        expect(todoCtr.data).toEqual([]);

        expect(localStorage.clear).toHaveBeenCalled();

    });

    describe("todoCtr.saveList", function(){
    	it("should change listmsg to true if the listname have spaces or it is not defined", function(){
    		todoCtr.listName = "and la";

    		todoCtr.saveList();

    		expect(todoCtr.listmsg).toBeTruthy();
    	});

    	it("should call the save the data if the condition is passed", function() {
    		todoCtr.listName = "andela";
    		spyOn(data, "save");

    		todoCtr.saveList();

    		expect(data.save).toHaveBeenCalledWith("andela");
    	});
    });

    it("should retreive listname from the local storage when the reList method is called", function(){
    	 
         todoCtr.reList();

         expect(todoCtr.listName).toEqual("andela");
    });

});