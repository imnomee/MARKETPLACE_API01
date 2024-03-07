import express from 'express';
const app = express();

app.get('/', (req, res) => {
    return res.send('hello world');
});
const PORT = 5100;

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});
