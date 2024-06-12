import { IMAGE_PATH } from "../constants"

type LSItem = {
  key: string
  value: string
}

export const setLocalStorage = (
  ...items: Array<LSItem>
) => {
  if (items.length !== 0) {
    items.forEach((item) => {
      localStorage.setItem(item.key, item.value)
    })
  }
}

export const getLocalStorage = (...keys: Array<string>) => {
  if (keys.length === 1) {
    return localStorage.getItem(keys[0])
  }
  else if (keys.length !== 0) {
    let result: any = {}
    keys.forEach((value) => {
      result[value] = localStorage.getItem(value)
    })
    return result
  } else {
    return null
  } 
}

export const setAuthStorage = (data: any) => {
  const { user, accessToken } = data
    setLocalStorage(
      { key: "id", value: user.id },
      { key: "token", value: accessToken },
      { key: "familyName", value: user.familyName },
      { key: "givenName", value: user.givenName },
      { key: "profileImage", value: user.profileImage ?? IMAGE_PATH.DEFAULT_AVATAR },
    )
}
