class EventHandler {
  counter: number;
  handlers: Map;
  constructor () {
    this.counter = 0
    this.handlers = new Map()
  }
  add (handler, handlerName) {
    if (!handlerName) handlerName = ++this.counter
    if (!(handler instanceof Function)) throw new TypeError('A handler must be a function')
    this.handlers.set(handlerName, handler)
    return handlerName
  }
  remove (handlerName) {
    this.handlers.delete(handlerName)
  }
  run (handlerName, args) {
    let handler = this.handlers.get(handlerName)
    if (handler && handler instanceof Function) handler(args)
  }
  runAll (args) {
    // eslint-disable-next-line no-unused-vars
    for (let [_, handler] of this.handlers) {
      if (handler instanceof Function) {
        handler(args)
      }
    }
  }
}

function Event () {
  const events = {
    map: new Map()
  }
  return (function () {
    events.init = function (global) {
      if (!global.events) {
        global.events = events
        events.on = function (eventName, handler, handlerName) {
          let eventHandler = events.map.get(eventName)
          if (!eventHandler) {
            eventHandler = new EventHandler()
            events.map.set(eventName, eventHandler)
          }
          return eventHandler.add(handler, handlerName)
        }
        events.publish = function (eventName, ...args) {
          let eventHandler = events.map.get(eventName)
          if (eventHandler && eventHandler instanceof EventHandler) {
            eventHandler.runAll(args)
          }
        }
        events.call = function (eventName, handlerName, ...args) {
          let eventHandler = events.map.get(eventName)
          if (eventHandler && eventHandler instanceof EventHandler) {
            eventHandler.run(handlerName, args)
          }
        }
        events.remove = function (eventName, handlerName) {
          let eventHandler = events.map.get(eventName)
          if (eventHandler && eventHandler instanceof EventHandler) {
            eventHandler.remove(handlerName)
          }
        }
      }
      return global.events
    }
    return events.init(window)
  })()
}

export default Event
