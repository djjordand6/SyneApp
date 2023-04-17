function App() {

  const onClick = () => {
    console.log("Clicked!")
  }

  return (
    <div className="container">
      <button
      align="center"
      type="button"
      className="mainButton"
      onClick={onClick}
      >click me!</button>
    </div>
  )
}

export default App
