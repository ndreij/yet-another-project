export const baseUrl = "https://norma.nomoreparties.space/api"

export function checkResponse(response: Response) {
    if (response.ok) {
        return response.json()
      } else if (response.status === 403) {
        return response.json()
      } else if (response.status === 404) {
        return Promise.reject('Error 404')
      } else {
        return Promise.reject('Some other error: ' + response.status)
      }
}

