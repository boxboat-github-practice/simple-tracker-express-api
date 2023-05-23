### Create new employee
127.0.0.1:8081/employees
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain name, github, and id fields`
✅ [3 / 4] **Assertion passed!** `response should have correct name and github user`
 

### Get new employee by ID
127.0.0.1:8081/employees/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain name, github, and id fields`
✅ [3 / 4] **Assertion passed!** `response should have correct id name and github user`
 

### Get all employees
127.0.0.1:8081/employees
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must contain test user`
 

### Update employee
127.0.0.1:8081/employees/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain name, github, and id fields`
✅ [3 / 4] **Assertion passed!** `response should have updated name and github user`
 

### Illegal update
127.0.0.1:8081/employees/1
✅ [1 / 2] **Assertion passed!** `Updates to ID should not be allowed. Response should return a 400`
 

### Get updated employee by ID
127.0.0.1:8081/employees/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain name, github, and id fields`
✅ [3 / 4] **Assertion passed!** `response should have correct id name and github user`
 

### Get all employees post update
127.0.0.1:8081/employees
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must contain test user`
 

### Delete employee
127.0.0.1:8081/employees/1
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Get employee by ID post delete
127.0.0.1:8081/employees/1
✅ [1 / 2] **Assertion passed!** `response should return a 404`
 

### Get all employees post delete
127.0.0.1:8081/employees
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must not contain test user`
 

### Create bad employee
127.0.0.1:8081/employees
✅ [1 / 2] **Assertion passed!** `Missing employee name. Response should return a 400`
 

### Update missing employee
127.0.0.1:8081/employees/-1
✅ [1 / 2] **Assertion passed!** `response should return a 404`
 

### Delete missing employee
127.0.0.1:8081/employees/-1
✅ [1 / 2] **Assertion passed!** `response should return a 404`