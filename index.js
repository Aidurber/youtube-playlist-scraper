"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

function add(...numbers) {
  return numbers.reduce((acc, current) => {
    return acc + current;
  }, 0);
}

exports.add = add;
//# sourceMappingURL=index.js.map
