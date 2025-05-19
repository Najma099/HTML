import axios from "axios";
import { atom, selector } from "recoil";
import { apiDomain } from "../utils/config";


export const balanceAtom = atom({
  key: "balanceAtom",
  default: selector({
    key: "balanceSelector",
    get: async () => {
      const response = await axios.get(apiDomain + '/api/v1/account/balance',
        {
          withCredentials: true,
        });
      return response.data.balance;
    }  
  })
});

