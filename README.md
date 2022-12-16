# Entail Ai

A BST web cralwer  

---

## Requirements

_**Node** 18_

### **Instructions**

- #### First install dependencies
  ```
  npm install
  ```
- #### Start server
  ```
  npm run dev
  ```

### **Server configuration**

Server is configured using **.env** file. <br> Create this file based on
**.env.example** file

* Specify which port the server listens on <br>
  **PORT=number**

* Activate CSR pages via proxy interceptor <br>
  **PROXY= 1 | 0**

* Set MongoDB URL connection <br>
  **DB_URL=URL**

### **Dependencies**

*  [**Fetch API**](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) implemented in _**Node** 18_ <br>
*    [**Puppeteer**](https://pptr.dev/) headless browser <br>
    _used when **PROXY=1**_

*    [**TS-Jest**](https://kulshekhar.github.io/ts-jest/) test runner for  _**Typescript/Node**_<br>