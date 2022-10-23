const getState = () => {
  const user = localStorage.getItem('user')
  if (!user) return undefined
  return JSON.parse(user)
}

export default getState
