### Create new client
127.0.0.1:8081/clients
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain name, url, and id fields`
✅ [3 / 4] **Assertion passed!** `response should have correct name and url`
 

### Get new client by ID
127.0.0.1:8081/clients/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain name, url, and id fields`
✅ [3 / 4] **Assertion passed!** `response should have correct id name and url`
 

### Get all clients
127.0.0.1:8081/clients
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must contain test user`
 

### Update client
127.0.0.1:8081/clients/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain name, url, and id fields`
✅ [3 / 4] **Assertion passed!** `response should have updated name and url`
 

### Illegal update
127.0.0.1:8081/clients/1
✅ [1 / 2] **Assertion passed!** `Updates to ID should not be allowed. Response should return a 400`
 

### Get updated client by ID
127.0.0.1:8081/clients/1
✅ [1 / 4] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 4] **Assertion passed!** `response body should contain name, url, and id fields`
✅ [3 / 4] **Assertion passed!** `response should have correct id name and url`
 

### Get all clients post update
127.0.0.1:8081/clients
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must contain test user`
 

### Delete a client
127.0.0.1:8081/clients/1
✅ [1 / 2] **Assertion passed!** `response must have OK status`
 

### Get client by ID post delete
127.0.0.1:8081/clients/1
✅ [1 / 2] **Assertion passed!** `response should return a 404`
 

### Get all clients post delete
127.0.0.1:8081/clients
✅ [1 / 3] **Assertion passed!** `response must be valid and have a body`
✅ [2 / 3] **Assertion passed!** `response must not contain test user`
 

### Create bad client
127.0.0.1:8081/clients
✅ [1 / 2] **Assertion passed!** `Missing client name. Response should return a 400`
 

### Update missing client
127.0.0.1:8081/clients/-1
✅ [1 / 2] **Assertion passed!** `response should return a 404`
 

### Delete missing client
127.0.0.1:8081/clients/-1
✅ [1 / 2] **Assertion passed!** `response should return a 404`