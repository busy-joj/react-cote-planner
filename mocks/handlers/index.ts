// The root-level request handlers combine
// all the domain-based handlers into a single

import { achievementHandlers } from './achievement';
import { userHandlers } from './user';

// network description array.
export const handlers = [...userHandlers, ...achievementHandlers];
