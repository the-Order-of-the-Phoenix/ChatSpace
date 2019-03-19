import Event from './dispatch'
const event = Event()
const handle = (error) => {
  debugger
  event.publish('error', error)
}
export default handle