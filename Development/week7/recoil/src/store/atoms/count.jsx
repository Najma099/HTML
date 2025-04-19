import { atom } from 'recoil';

export const countAtom = atom({
  key: 'countAtom',
  default: {
    count: 0,
    setCount: 0
  }
});