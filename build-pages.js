const { default: axios } = require("axios")
// dummy
console.log('starting to run the script')
if (process.env.RUNTIME_ENV === 'development') {
  // axios.post('https://staging.cms.myfanpark.com/nextjs_prebuild')
} else {
  // axios.post('https://cms.myfanpark.com/nextjs_prebuild')
}

console.log('script ran successfully')