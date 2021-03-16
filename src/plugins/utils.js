/**
 * OY：关于lodash防抖节流的源码学习，参考：博客 https://github.com/yygmind/blog 中的如下几篇文章 
【进阶 7-1 期】深入浅出节流函数 throttle
【进阶 7-2 期】深入浅出防抖函数 debounce
【进阶 7-4 期】深入篇 | 阿里 P6 必会 Lodash 防抖节流函数实现原理
【进阶 7-5 期】浅出篇 | 7 个角度吃透 Lodash 防抖节流原理
 */
const root = window; // 在lodash内部实现中，root可兼容多种环境，在此处强制设置root为window即可
// lodash 内部工具函数：
function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}
// lodash 防抖源码， 文档参考：https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options
function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;

  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    !wait && wait !== 0 && typeof root.requestAnimationFrame === "function";

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId);
      return root.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait);
  }

  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timerId !== undefined;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}
// lodash 节流源码，文档参考：https://www.lodashjs.com/docs/latest#_throttlefunc-wait0-options
function throttle(func, wait, options) {
  let leading = true;
  let trailing = true;

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  });
}

// 获取el是否在可视区内，不需要完整出现在视区内，部分可视依然认为在可视区内
function isElementInViewport(el) {
  const viewHeight = document.documentElement.clientHeight;
  const viewWidth = document.documentElement.clientWidth;
  // 关于getBoundingClientRect，参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
  const { left, right, top, bottom } = el.getBoundingClientRect();
  // 纵向不可见：
  // if (bottom < 0 ||  top > viewHeight ) { // 正常视区判断，
  // 设置一个冗余量：视区自身的高度，若溢出视区的高度不操过视区高度，也视为可见
  if (bottom < -viewHeight || top > viewHeight * 2) {
    return false;
  }
  // 横向不可见：
  if (right < 0 || left > viewWidth) {
    return false;
  }
  return true;
}

// 将arr分为多个小数组，以step为步数, 默认为5
// 例如，输入：arr = [1,2,3,4,5]; step = 2； 输出：[[1,2], [3,4], [5]];
function sliceArrToBinArrWithStep(arr, step = 5) {
  if (!Array.isArray(arr)) {
    throw Error("sliceArrToBinArrWithStep的 第一个参数必须为数组");
  }
  const slices = [];
  let len = 0;
  while (len < arr.length) {
    slices.push(arr.slice(len, len + step));
    len += step;
  }
  // console.log(slices);
  return slices;
}

// 返回奇数项和偶数项，并看奇数和偶数是否相等
function oddEvenArr(arr) {
  let isOddEvenSame = false;
  if (arr.length % 2 == 0) {
    // 说明是偶数
    isOddEvenSame = true;
  }
  // 奇数项
  const oddArr = [];
  // 偶数项
  const evenArr = [];
  arr.forEach((item, index) => {
    if (index % 2) {
      evenArr.push(item);
    } else {
      oddArr.push(item);
    }
  });
  return { oddArr, evenArr, isOddEvenSame };
}

export {
  debounce,
  throttle,
  isElementInViewport,
  sliceArrToBinArrWithStep,
  oddEvenArr
};
