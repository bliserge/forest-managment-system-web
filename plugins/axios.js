/* eslint-disable no-undef */
export default function ({ $axios,  redirect }) {
  if (process.browser) {
    let token = localStorage.getItem('token')
    $axios.onRequest(() => {
      token = localStorage.getItem('token')
      $axios.setToken(token)
    })
  } else {
    console.error("Not browser")
  }
  $axios.onError(error => {
    const code = parseInt( error.response.status)
    if (code === 401) {
      // eslint-disable-next-line no-undef
      $nuxt.$cookies.removeAll()
      redirect('/login')
      return 0
    }
  })
}
