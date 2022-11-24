const device = getDevice()

function getDevice() {
    const u = navigator.userAgent
    const isWx = u.indexOf('MicroMessenger') > -1 // 是否微信
    const isQQ = u.match(/\sQQ/i) === ' qq' // 是否QQ
    const isIPad = (u.match(/(iPad)/) /* iOS pre 13 */ || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

    return {
        include: u.indexOf('NTWeather') !== -1,
        special: u.indexOf('NTWeather_v1') !== -1,
        system: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || isIPad ? 'ios' : 'android',
        isWx,
        isQQ
    }
}

function sendMessage(method, params = {}) {
    // console.log(params, '参数')
    const { system } = device

    if (system === 'ios') {
        if (window && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[method]) {
            if (typeof params == 'object') {
                return window.webkit.messageHandlers[method].postMessage(JSON.stringify(params))
            } else {
                return window.webkit.messageHandlers[method].postMessage(params)
            }
        }
    }
    if (system === 'android') {
        if (window && window.android && window.android[method]) {
            if (Object.keys(params).length > 0 && typeof params == 'object') {
                return window.android[method](JSON.stringify(params))
            } else if (typeof params == 'string') {
                return window.android[method](params)
            } else {
                return window.android[method]()
            }
        }
    }
}

export {
    device,
    getDevice,
    sendMessage
}