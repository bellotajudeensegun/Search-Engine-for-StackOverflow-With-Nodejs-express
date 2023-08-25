const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('search');
});



app.get('/search', async (req, res) => {
  const query = req.query.query;
  // Use the Stack Overflow API to search for questions based on the query
  const apiUrl = `STACK_OVERFLOW_API_URL_HERE`;
  
  try {
    const response = await axios.get(apiUrl);
    const results = response.data.items.map(item => ({
      title: item.title,
      link: item.link
    }));
    res.render('search', { results });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching search results');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
