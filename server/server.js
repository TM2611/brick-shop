import express from 'express';
import path from 'path';
import url from 'url';


const app = express();

// this will serve the files present in public/ for all other requests

//app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'public')));
app.use(express.static('../public/'));

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

