const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('user', serializedState)
  } catch (err) {
    console.log(err)
  }
}
export default saveState
