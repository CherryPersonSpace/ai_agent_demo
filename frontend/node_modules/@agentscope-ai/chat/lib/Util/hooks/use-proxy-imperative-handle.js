// Proxy the dom ref with `{ nativeElement, otherFn }` type
// ref: https://github.com/ant-design/ant-design/discussions/45242

import { useImperativeHandle } from 'react';
export default function useProxyImperativeHandle(ref, init) {
  return useImperativeHandle(ref, function () {
    var refObj = init();
    var nativeElement = refObj.nativeElement;
    return new Proxy(nativeElement, {
      get: function get(obj, prop) {
        if (refObj[prop]) {
          return refObj[prop];
        }
        return Reflect.get(obj, prop);
      }
    });
  });
}