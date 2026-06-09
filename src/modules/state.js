// Shared mutable state — import by reference, mutate in place

export const CODE_LINES = [];

export const historia = [];

export const translatorState = {
  data: null,
  snapshot: null,
  cache: {},
};

export const vivisekcjaState = {
  cache: null,
  snapshot: null,
};

export const deadCodeState = {
  cache: null,
  snapshot: null,
  active: false,
};

export const badPatternsState = {
  cache: null,
  snapshot: null,
  active: false,
};
