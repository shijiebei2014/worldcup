module.exports = function(app) {
  app.get('/', (req, res) => {
    res.send('Welcome to World Cup 2018')
  })
}
