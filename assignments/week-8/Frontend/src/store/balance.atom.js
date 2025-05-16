import axios from "axios";
import { atom, selector } from "recoil";
export const balanceAtom = atom({
  key: "balanceAtom",
  default: 0
});

export const balanceSelector = selector({
  key: "balanceSelector",
  get: async () => {
    const response = await axios.get('http://localhost:5001/api/v1/account/balance',
      {
        withCredentials: true,
      });
    return response.data.balance;
  }
});