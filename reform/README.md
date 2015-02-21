Build vendor.js
browserify -r react -r react-tools -r reactify -r lodash -r object-assign -r es5-shim -o ./dist/vendor.js

Build reform.js
browserify -x react -x react-tools -x reactify -x lodash -x object-assign -x es5-shim ./src/reform.js -o ./dist/reform.js -d -s reform
