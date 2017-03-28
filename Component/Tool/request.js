import queryString from 'query-string'
import _ from 'lodash'
import config from './config'

module.exports = {
  get: function(url, params){
    if(params){
      url +='?' + queryString.stringify(params)
    }
   console.log(url);
    return fetch(url)
      .then((res) => res.json())
  },
  post: function(url, body){
    let opts = _.extend(config.header, {
      method: 'POST',
      body: JSON.stringify(body)
    })

    return fetch(url, opts)
      .then((res) => res.json())
  }
}