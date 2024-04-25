const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000


//middleware
app.use(cors());
app.use(express.json());



app.get('/',(req, res)=>{
    res.send('CanvcasCarftHub server is running')
})

app.listen(port,()=>{
    console.log(`CanvcasCarftHub server is running on port ${port}`);
})
