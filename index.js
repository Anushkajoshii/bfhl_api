const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            throw new Error("Invalid input format. 'data' should be an array.");
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());

        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
            ? lowercaseAlphabets.sort().slice(-1)
            : null;

        res.json({
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
        });
    } catch (error) {
        res.json({
            is_success: false,
            message: error.message
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
