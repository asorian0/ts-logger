# ts-logger
Simple logger written in TypeScript for Node.js

[![Build Status](https://travis-ci.org/asorian0/ts-logger.svg?branch=master)](https://travis-ci.org/asorian0/ts-logger)
[![codecov](https://codecov.io/gh/asorian0/ts-logger/branch/master/graph/badge.svg)](https://codecov.io/gh/asorian0/ts-logger)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Coverage](https://github.com/asorian0/ts-logger/blob/master/documentation/images/coverage-badge-documentation.svg)](https://github.com/asorian0/ts-logger)

## Usage
```
import { Logger } from '@asoriano/ts-logger;

const logger = new Logger({
  path: './path',
  filename: 'name.log',
});
```

### Options
| Name            | Type     | Example                   | Is optional |
| --------------- | :------: | ------------------------: | ----------: |
| `path`          | `string` | `'./some-relative-path'`  | `false`     |
| `filename`      | `string` | `'app-name.log'`          | `false`     |
| `loggerLogFile` | `string` | `'/some-path/logger.log'` | `true`      |

## Test
Just run `npm test`.

## Contributing
Any feedback is always welcome so please just raise an issue and will reply ASAP. Feel free to create PR if you have the time.
