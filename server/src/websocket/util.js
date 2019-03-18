export const getMsgEntityFromMsg = (msg: string) => {
  let entity = {}
  try {
    entity = JSON.parse(msg)
    return entity
  } catch (e) {
    return null
  }
}

export const getUserIdFromSession = (session: string, sessionDecoder) =>{
  if (sessionDecoder && sessionDecoder instanceof Function) {
    return sessionDecoder(session)
  } else {
    return session
  }
}