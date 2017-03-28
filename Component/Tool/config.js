
module.exports = {
  header:{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },    
  },
  api:{
   
    base: 'http://news-at.zhihu.com/api',
    accessToken:'abc',
    themes: '/4/themes',
    newslaste:'/4/news/latest',
    theme:'/4/theme',
    news:'/4/news',
    css:'http://daily.zhihu.com/css/share.css?v=5956a', //知乎日报详情页css样式 爬的
    video: 'creations/video',
    up: 'up',
    comment: 'comments',
    commentPost: 'commentsPost',
    signup: 'user/signup',
    verify: 'user/verify',
    update: 'user/update',
    signature: 'signature',
  }
 
}