import express from "express";
import pkg from "pg";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
const { Pool } = pkg;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.use(express.json());

const pg = new Pool({
    user: process.env.DB_USER,         
    host: process.env.DB_HOST,         
    database: process.env.DB_NAME,     
    password: process.env.DB_PASSWORD, 
    port: 5432, 
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/',async (req, res) => {
    try {
        const result = await pg.query("SELECT * FROM expense ORDER BY id DESC");
        res.render("check.ejs", { expenses: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error retrieving expenses");
    }
});

app.post("/add", async (req, res) => {
    //const { name, amount, category } = req.body;

    const name = req.body.name;
    const amount = req.body.amount;
    const category = req.body.category;
    try {
        await pg.query("INSERT INTO expense (name, amount, category) VALUES ($1, $2, $3)", [name, amount, category]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error adding expense");
    }
});

app.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pg.query("DELETE FROM expense WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error deleting expense");
    }
});


app.listen(3000, ()=>{
    console.log("server is running on port 3000");
  });
