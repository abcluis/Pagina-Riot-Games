if(process.env.MONGODB_URI){
    module.exports = Object.freeze({
        ROOT_URL: 'https://peaceful-spire-81262.herokuapp.com/api'
    })
}else {
    module.exports = Object.freeze({
            ROOT_URL: 'http://localhost:3000/api'
    })
}
