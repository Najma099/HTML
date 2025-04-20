import { atom,selector } from "recoil";
import axios from "axios"
export const networkAtom = atom({
  key: "networkAtom",
  default: 102,
});

export const jobsAtom = atom({
  key: "jobsAtom",
  default: 0,
});

export const notificationAtom = atom({
  key: "notificationAtom",
  default: 12,
});

export const messagingAtom = atom({
  key: "messagingAtom",
  default: 0,
});

export const totalMessageSelector = selector({
  key: "totalMessageSelector",
  value: ({get}) => {
    const networkCount = get(networkAtom);
    const messageCount = get(messagingAtom);
    const jobsCount = get(jobsAtom);
    const notificationCount = get(notificationAtom)
    return  networkCount  + messageCount +  jobsCount +  notificationCount
  }
})

//Asynchronous data Query:
export const notification = atom({
  key: "networkAtom",
  default: selector({
    key: "networkAtomSelector",
    get: async () => {
      const res = await axios.get("");
      return res.data;
    }
  })
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({get}) => {
    const allnotification = get(notification);
    return  allnotification.network +  allnotification.job +  allnotification.messages + allnotification.notifications
  }
})