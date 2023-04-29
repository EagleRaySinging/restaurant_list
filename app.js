// 宣告伺服器的相關變數
const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
// 告訴express拉取餐廳資料
const restaurantList = require('./restaurant.json')

// 設定樣板引擎
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態資料夾
app.use(express.static('public'))

// 設定根目錄，餐廳首頁總覽渲染
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 設定show，打造餐廳資訊渲染
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurant })
})

// 設定searchbar
app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  const restaurantFilter = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurantFilter, keyword: keyword })
})




// 綁監聽器在伺服器上
app.listen(port, () => {
  console.log(`Restaurant_List is listening on http://localhost:${port}`)
})