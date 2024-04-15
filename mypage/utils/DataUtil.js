
/**
 * 去除转义字符
 * @returns
 */
function deleteSanitizeForJson(str) {
    return str.replace(/[\\]/g, '') // 反斜杠 \
        .replace(/[\b]/g, '') // 退格符
        .replace(/[\f]/g, '') // 换页符
        .replace(/[\n]/g, '') // 换行符
        .replace(/[\r]/g, ''); // 回车符
}
/**
 * 得到随机颜色
 * @returns  {string} 随机生成的6位16进制颜色值
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    // 返回的颜色值是大小写不敏感的，以便在比较时更加灵活
    return color.toLowerCase();
}

function isNullValue(e) {
    if (e == null || e == undefined || e == "" || e == "null" || e == "undefined") {
        return true;
    } else {
        return false;
    }
}