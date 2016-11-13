/*
 * enables jsdom globally.
 */
import * as jsdom from 'jsdom';
import {KEYS} from './jsdom-keys';

const defaultHtml = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';

export function globalJsdom (html: string = undefined, options: {} = undefined): () => void {
  if (html === undefined) {
    html = defaultHtml;
  }

  if (options === undefined) {
    options = {};
  }

  // Idempotency
  if ((global as any).navigator &&
    (global as any).navigator.userAgent &&
    (global as any).navigator.userAgent.indexOf('Node.js') > -1 &&
    (global as any).document &&
    typeof (global as any).document.destroy === 'function') {
    return (global as any).document.destroy;
  }

  let document = jsdom.jsdom(html, options);
  let window = document.defaultView;

  KEYS.forEach((key) => {
    (global as any)[key] = (window as any)[key];
  });

  (global as any).document = document;
  (global as any).window = window;
  (window as any).console = global.console;
  (global as any).destroy = cleanup;

  function cleanup () {
    KEYS.forEach(key => delete (global as any)[key] );
  }

  return cleanup;
}
