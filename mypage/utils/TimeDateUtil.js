function timestampToDate(timestamp, format) {
    // 将时间戳转换为JavaScript Date对象
    var date = new Date(timestamp);
    format = format ? format : 'yyyy-MM-dd HH:mm:ss';
    // 定义格式化所需的方法
    var map = {
        "yyyy": date.getFullYear(), // 年份
        "MM": ('0' + (date.getMonth() + 1)).slice(-2), // 月份，需要加1是因为getMonth()返回的是0-11的值
        "dd": ('0' + date.getDate()).slice(-2), // 日期
        "HH": ('0' + date.getHours()).slice(-2), // 小时
        "mm": ('0' + date.getMinutes()).slice(-2), // 分钟
        "ss": ('0' + date.getSeconds()).slice(-2) // 秒
    };
    // 替换格式化字符串中的占位符
    format = format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (match) {
        return map[match];
    });
    return format;
}