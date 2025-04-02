const express = require('express');
const app= express();
const port = 3000;

app.use(express.json());

// number validation
function isValidNumber(value) {
    return !isNaN(value) && typeof value === 'number';
}
//Parameter Validation
function validateParams(req, res, Param1=false){
    const{num1, num2}= req.query;
    if(Parem1){
        if(num1=== undefined){
            return handleError(res, "Parameter num1 isn't founded")
        }
        const con1 = parseFloat(num1);
        if (isNaN(con1)){
            return handleError(res, 'num1 needs to be a number')
        }return[con1];
    }
        else{
            if (num1===undefined || num2===undefined){
                return handleError(res, 'parameter num1&num2 not find');
            }
            const con1 = parseFloat(num1);
            const con2 = parseFloat(num2);
            if (isNaN(con1)||isNaN(con2)){
                return handleError(res, 'num1 and num2 needs to be a number')
            }return[con1, con2];
        }
    }

// add endpoints
app.get('/add', (req, res) => {
    const params = validateParams(req, res);
    if ((!params.con1 && params.con1!== 0) || (!params.con2 && con2 !==0)) return;
    res.json({ result: params.conn1 + params.con2 });
})

// minus endpoint
app.get('/minus', (req, res) => {
    const params = validateParams(req, res);
    if ((!params.con1 && params.con1!== 0) || (!params.con2 && con2 !==0))  return;
    res.json({ result: params.conn1 - params.con2 });
})


// multiply endpoint
app.get('/multiply', (req, res) => {
    const params = validateParams(req, res);
    if ((!params.con1 && params.con1!== 0) || (!params.con2 && con2 !==0))  return;
    res.json({ result: params.conn1 * params.con2 });
})

// divide endpoint
const params = validateParams(req, res);
if ((!params.con1 && params.con1!== 0) || (!params.con2 && con2 !==0))  return;
if(params.con2===0){
    return handleError(res, '0 cannot be divided');
}
res.json({ result: params.conn1 / params.con2 });

// Exponential operation
app.get('/power', (req, res) => {
    const params = validateParams(req, res);
    if ((!params.con1 && params.con1!== 0) || (!params.con2 && con2 !==0))  return;
    res.json({ result: Math.pow(params.con1, params.con2) });
});

// Square root operation
app.get('/sqrt', (req, res) => {
    const params = validateParams(req, res, true);
    if ((!params.con1 && params.con1!== 0) || (!params.con2 && con2 !==0))  return;
    if (params.num1 < 0) {
        return handleError(res, 'In square root calculation, param cannot be negative.');
    }
    res.json({ result: Math.sqrt(params.num1) });
});


// Modulo operation
app.get('/mod', (req, res) => {
    const params = validateParams(req, res);
    if (!params.num1 && params.num1 !== 0) return;
    if (params.con2 === 0) {
        return handleError(res, 'num2 cannot be zero.');
    }
    res.json({ result: params.n1 % params.n2 });
});

// make the server start
app.listen(port, () => {
    console.log(`This microservice running at http://localhost:${port}`);
});
