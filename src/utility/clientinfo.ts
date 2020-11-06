enum ResolutionClass {
    high,
    medium,
    low
}

class ClientInfo {
    static isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') === -1 &&
               navigator.userAgent.indexOf('FxiOS') === -1;
    static isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    static isIphone = /iPhone|iPod/i.test(navigator.userAgent);
    static isIpad = /iPad/i.test(navigator.userAgent);
    static isAndroid = /iPad/i.test(navigator.userAgent);

    static get resolutionClass(): ResolutionClass {
        const pixelCount = window.innerHeight * window.innerWidth
        if (pixelCount >= 1920 * 1080) {
            return ResolutionClass.high;
        } else if (pixelCount >= 1280 * 720) {
            return ResolutionClass.medium;
        } else {
            return ResolutionClass.low;
        }
    }
}

export { 
    ClientInfo, ResolutionClass
}