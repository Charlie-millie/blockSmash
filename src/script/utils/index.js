import {$BlockSmashInstance} from "../Globals";

export function polyfill() {
    window.requestAnimationFrame || (window.requestAnimationFrame = (callBack) => {
        setTimeout(callBack, 1000 / 60);
    });
    window.cancelAnimationFrame || (window.cancelAnimationFrame = (callBack) => {
        clearTimeout(window.requestAnimationFrame);
    });
}

export function applyStyle(target, styles) {
    for (let value in styles) {
        target.style[value] = styles[value];
    }
}

export function isFunction(functionToCheck) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function validateInRange(value, min, max) {
    let validValue;
    if (max && value > max) {
        validValue = max;
    } else if (min && value < min) {
        validValue = min;
    } else {
        validValue = value;
    }
    return validValue;
}

export function timeFormat(time, minutesLength = 1){
    if (time > -1) {
        const t = Number(time),
            hours = Math.floor(t / 60 / 60),
            minutes = Math.floor(t / 60) - (hours * 60 * 60),
            seconds = Math.floor(t) - (hours * 60 * 60) - (minutes * 60);
        return `${hours > 0 ? hours + ':' : ''}${minutesLength === 2 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    } else {
        return "0:00";
    }
}


// sizing functions
export function normalizeBox(x, y, width, height) {
    console.info(`Original X: ${x}, Y: ${y}, Width: ${width}, Height: ${height}`);
    let {width: stageWidth, height: stageHeight} = $BlockSmashInstance.getStageSize();
    let normalizedX = x / stageWidth;
    let normalizedY = y / stageHeight;
    let normalizedWidth = width / stageWidth;
    let normalizedHeight = height / stageHeight;
    console.info(`Normalized: X: ${normalizedX}, Y: ${normalizedY}, Width: ${normalizedWidth}, Height: ${normalizedHeight}`);
    return {
        x: normalizedX,
        y: normalizedY,
        width: normalizedWidth,
        height: normalizedHeight
    };
}


