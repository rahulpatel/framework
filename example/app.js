'use strict';

import framework from '../src';
import Persistence from './stores/Persistence';

framework.setup({ Persistence });

// Can't use imports here as they get hoisted, framework.setup needs to happen
// before we add any stores.
require('./stores/todos');
require('./routes/index');

framework.start();
