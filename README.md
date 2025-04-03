# SIT323 Task 4.2 Enhanced Calculator Microservice sit323-2025-prac4c

## used technologies

- Node.js
- Github
- Visual Studio Code


## Project Profile

This project is based on the Calculator microservice before, with newly implented advanced arithmetic operations and enhanced error handling mechnisms.


## Installation of Express framework and Running the Microservice

```bash
npm install express
node 4C.js
```
## New code
```javascript
const express = require('express');
const app= express();
const port = 3000;

app.use(express.json());

// Error handling
function handleError(res, message) {
    res.status(400).json({ error: message });
}

// number validation
function isValidNumber(value) {
    return !isNaN(value) && typeof value === 'number';
}
//Parameter Validation
function validateParams(req, res, single = false) {
    const { num1, num2 } = req.query;
    if (single) {
        if (num1 === undefined) {
            return handleError(res, "num1 isn't found");
        }
        const con1 = parseFloat(num1);
        if (isNaN(con1)) {
            return handleError(res, "num1's type is number!");
        }
        return [con1];
    } else {
        if (num1 === undefined || num2 === undefined) {
            return handleError(res, "num1 & num2 aren't found");
        }
        const con1 = parseFloat(num1);
        const con2 = parseFloat(num2);
        if (isNaN(con1) || isNaN(con2)) {
            return handleError(res, "num1'& num2's type are number!");
        }
        return [con1, con2];
    }
}

// add endpoints
app.get('/add', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    res.json({ result: con1 + con2 });
});

// minus endpoint
app.get('/minus', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    res.json({ result: con1 - con2 });
});

// multiply endpoint
app.get('/multiply', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    res.json({ result: con1 * con2 });
});

// divide endpoint
app.get('/divide', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    if (con2 === 0) {
        return handleError(res, '0 cannot be divided');
    }
    res.json({ result: con1 / con2 });
});

// Exponential operation
app.get('/power', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    res.json({ result: Math.pow(con1, con2) });
});

// Square root operation
app.get('/sqrt', (req, res) => {
    const [con1] = validateParams(req, res, true);
    if (con1 === undefined) return;
    if (con1 < 0) {
        return handleError(res, 'In square root calculation, param cannot be negative.');
    }
    res.json({ result: Math.sqrt(con1) });
});

// Modulo operation
app.get('/mod', (req, res) => {
    const [con1, con2] = validateParams(req, res);
    if (con1 === undefined || con2 === undefined) return;
    if (con2 === 0) {
        return handleError(res, 'num2 cannot be zero.');
    }
    res.json({ result: con1 % con2 });
});
// make the server start
app.listen(port, () => {
    console.log(`This microservice running at http://localhost:${port}`);
});


```

## Test For API Endpoints
### Basic Operations

{"result": 3}
http://localhost:3000/divide?num1=1&num2=0
{"error": "Zero cannot be divided."}
- **add**
  - `http://localhost:3000/add?num1=2&num2=3`
  - Response: `{ "result": 5}`

- **minus**
  - `http://localhost:3000/minus?num1=10&num2=2
  - Response: `{"result": 8}`

- **multiply**
  - `http://localhost:3000/multiply?num1=2&num2=6`
  - Response: `{"result": 12}`

- **divide**
  - `http://localhost:3000/divide?num1=9&num2=3`
  - Response: `{ "result": 3 }`

### Advanced Operations

- **Exponential operation**
  - `http://localhost:3000/power?/power?num1=2&num2=3`
  - Response: `{ "result": 8 }`

- **Square root operation**
  - `http://localhost:3000/sqrt?num1=100`
  - Response: `{ "result": 10 }`

- **Modulo operation**
  - `http://localhost:3000/mod?num1=10&num2=3`
  - Response: `{ "result": 1 }`

## Error Handling Example

- **Parameters Missing**
  - `http://localhost:3000/add?num1=9`
  - Response: `{ "error": 'num1 & num2 aren't found' }`

- **Divide by 0**
  - `http://localhost:3000/divide?num1=1&num2=0`
  - Response: `{ "error": '0 cannot be divided' }`

