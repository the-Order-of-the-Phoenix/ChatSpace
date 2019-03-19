const strlen = (str: string) => {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    //单字节加1   
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    }
    else {
      len += 2
    }
  }
  return len
}

const strIdx = (str: string, idx: number) => {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    }
    else {
      len += 2
    }
    if (idx <= len) return i
  }
  return str.length
}

export function trim(str: string, contentLength) {
  if (!str || strlen(str) <= contentLength * 2) {
    return str
  } else {
    return str.substr(0, strIdx(str, contentLength * 2 + 1)) + '...'
  }
}