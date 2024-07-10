const connectTomongo=require('./db'); //here we get the exports connecttomongo function from db and store it to the connectTomongo variable
connectTomongo();

const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000

app.use(express.json());
app.use(cors())
// app.get('/', (req, res) => {
//   res.send('Hello harry!')
// })
// app.get('/api/v1/login', (req, res) => {
//   res.send('Hello login!')
// })
// app.get('/api/v1/signup', (req, res) => {
//   res.send('Hello signup!')
// })

//Available routes
// app.use("/api/auth"),require("./routes/auth")
// app.use("/api/notes"),require("./routes/notes")

const authRoutes = require("./routes/auth");  //it is used to get the auth from the file routes through authroutes
const notesRoutes = require("./routes/notes");  ////it is used to get the auth from the file routes through authroutes

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`iNoteBook app listening on port http://localhost:${port}`)
})