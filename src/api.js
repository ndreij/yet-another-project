const baseUrl = "https://norma.nomoreparties.space/api"

function checkResponse(response) {
    if (response.ok) {
        return response.json()
      } else if (response.status === 404) {
        return Promise.reject('Error 404')
      } else {
        return Promise.reject('Some other error: ' + response.status)
      }
}

export { baseUrl, checkResponse }