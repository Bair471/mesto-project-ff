module.exports = {  
  plugins: [
    require('autoprefixer'),    
    require('postcss-import'),
    require('postcss-url')({      
      url: 'rebase',
    }),    
    require('cssnano')({ preset: 'default' }),
  ]};