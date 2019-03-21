export const format = (date: string) => {
  if (isToday(date)) return '今天'
  if (isYesterday(date)) return '昨天'
  date = new Date(date);
  return dateFormat('yyyy-MM-dd hh:mm', date)
}

function isToday(str) {
  const theDate = new Date(str)
  const date = (new Date())
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const yesterday = new Date(today - 24 * 3600 * 1000).getTime()
  return theDate.getTime() >= today
}

function isYesterday(str) {
  const theDate = new Date(str)
  const date = (new Date())
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const yesterday = new Date(today - 24 * 3600 * 1000).getTime()
  return theDate.getTime() < today && yesterday <= theDate.getTime()
}

function dateFormat(fmt, date) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
} 