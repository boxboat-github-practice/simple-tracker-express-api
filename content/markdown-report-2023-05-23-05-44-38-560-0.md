### Create new employee
127.0.0.1:8081/employees
✅ [1 / 2] **Assertion passed!** `response must be valid and have a body`
 

### Create new client
127.0.0.1:8081/clients
✅ [1 / 2] **Assertion passed!** `response must be valid and have a body`
 

### Create new contract
127.0.0.1:8081/contracts
✅ [1 / 2] **Assertion passed!** `response must be valid and have a body`
 

### Create new client for update
127.0.0.1:8081/clients
✅ [1 / 2] **Assertion passed!** `response must be valid and have a body`
 

### Create new employee for update
127.0.0.1:8081/employees
✅ [1 / 2] **Assertion passed!** `response must be valid and have a body`
 

### Create new contract for update
127.0.0.1:8081/contracts
✅ [1 / 2] **Assertion passed!** `response must be valid and have a body`
 

### Create new history
127.0.0.1:8081/history
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain id, clientId, contractId, employeeId and role fields`
✅ [3 / 4] **Assertion passed!** `response should have correct ids and role`
 

### Get new history by ID
127.0.0.1:8081/history/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain id, clientId, contractId, employeeId and role fields`
✅ [3 / 4] **Assertion passed!** `response should have correct ids and role`
 

### Get all history
127.0.0.1:8081/history?employeeId=1&clientId=1&contractId=1
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must contain test history`
 

### Illegal update
127.0.0.1:8081/history/1
✅ [1 / 2] **Assertion passed!** `Updates to ID should not be allowed. Response should return a 400`
 

### Update history
127.0.0.1:8081/history/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain id, clientId, contractId, employeeId and role fields`
✅ [3 / 4] **Assertion passed!** `response should have updated name and url`
 

### Get updated history by ID
127.0.0.1:8081/history/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain id, clientId, contractId, employeeId and role fields`
✅ [3 / 4] **Assertion passed!** `response should have correct id name and url`
 

### Get all history post update
127.0.0.1:8081/history?employeeId=2&clientId=2&contractId=2
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must contain test history`
 

### Delete history
127.0.0.1:8081/history/1
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Get history by ID post delete
127.0.0.1:8081/history/1
✅ [1 / 2] **Assertion passed!** `response should return a 404`
 

### Get all history post delete
127.0.0.1:8081/history?employeeId=2&clientId=2&contractId=2
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must not contain test history`
 

### Delete contract
127.0.0.1:8081/contracts/1
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Delete contract for update
127.0.0.1:8081/contracts/2
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Delete client
127.0.0.1:8081/clients/1
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Delete client for update
127.0.0.1:8081/clients/2
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Delete employee
127.0.0.1:8081/employees/1
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Delete employee for update
127.0.0.1:8081/employees/2
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Create bad history
127.0.0.1:8081/history
✅ [1 / 2] **Assertion passed!** `Missing or invalid clientId, contractId, or employeeId response should return a 400`
 

### Update missing history
127.0.0.1:8081/history/-1
✅ [1 / 2] **Assertion passed!** `response should return a 404`
 

### Delete missing history
127.0.0.1:8081/history/-1
✅ [1 / 2] **Assertion passed!** `response should return a 404`