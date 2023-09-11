const Notification = ({ message, type }) => {
  const NotificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: `${type}`,
    color: `${type}`,
    width: 'fit-content'
  }

  if (message === null) return null

  return (
    <div style={NotificationStyle}>
      {message}
    </div>
  )
}
export default Notification