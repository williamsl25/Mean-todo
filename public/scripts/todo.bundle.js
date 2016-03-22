webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp', []);

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.controller('mainCtrl', function($scope, dataService){

	  dataService.getTodos(function(response){
	    var todos = response.data.todos;
	    $scope.todos =  todos;
	    });

	  $scope.addTodo = function() {
	    $scope.todos.unshift({name: "This is a new todo.",
	                      completed: false});
	  };

	})


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	  .controller('todoCtrl', function($scope, dataService) {
	    $scope.deleteTodo = function(todo, index) {
	      dataService.deleteTodo(todo).then(function() {
	       $scope.todos.splice(index, 1);
	     });
	    };

	  $scope.saveTodos = function() {
	    var filteredTodos = $scope.todos.filter(function(todo){
	      if(todo.edited) {
	        return todo
	      };
	    })
	    dataService.saveTodos(filteredTodos).finally($scope.resetTodoState());

	  };

	  $scope.resetTodoState = function(){
	    $scope.todos.forEach(function(todo){
	      todo.edited = false;
	    });
	  };

	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.directive('todo', function(){
	  return {
	    templateUrl: 'templates/todo.html',
	    replace: true,
	    controller: 'todoCtrl'
	  }
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.service('dataService', function($http, $q) {
	  this.getTodos = function(cb) {
	    $http.get('/api/todos').then(cb);
	  };

	  // this.deleteTodo = function(todo) {
	  //   console.log("I deleted the " + todo.name + " todo!");
	  // };

	  this.deleteTodo = function(todo) {
	    if (!todo._id) {
	      return $q.resolve();
	    }
	    return $http.delete('/api/todos/' + todo._id).then(function() {
	      console.log("I deleted the " + todo.name + " todo!");
	    });
	  };

	  this.saveTodos = function(todos) {
	    // create an array of requests we can now use the q service to run all of our requests in parallel
	    var queue = [];
	    todos.forEach(function(todo) {
	        var request;
	        if(!todo._id) {
	          request = $http.post('/api/todos', todo);
	      } else { // use the put route when existing todo is edited
	        request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {
	            todo = result.data.todo;
	            return todo;
	          });
	      }
	      queue.push(request);
	    });
	    return $q.all(queue).then(function(results){ // iterates through the q runs each request and for all of them returns a promise - with results paramerter
	      console.log("I saved " + todos.length + " todos!");

	    });

	  };

	});


/***/ }
]);