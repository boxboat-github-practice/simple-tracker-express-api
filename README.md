15
# simple-tracker-express
Simple api for tracking work made with vanilla javascript using expressjs. Meant to be forked/extended/replaced

- [web server](https://github.com/boxboat-github-practice/simple-tracker-express-web)

```mermaid
---
title: Schema
---
erDiagram
  EMPLOYEE }|--o{ HISTORY : employeeId 
  EMPLOYEE {
    int id
    string name
    string github
  }
  CLIENT }|--o{ HISTORY : clientId
  CLIENT{
    int id
    string name
    string url
  }
  CONTRACT }|--o{ HISTORY: contractId
  CONTRACT {
    int id
    int clientId
    string type
    date startDate
    date endDate
    list tech
  }
  HISTORY{
    int id
    int clientId
    int employeeId
    int contractId
    string employeeName
    string clientName
    string role
  }
```
