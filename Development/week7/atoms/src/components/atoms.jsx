import { atom } from "recoil";

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

export const totalMessageSelector = atom({
  key: "totalMessageSelector",
  value: ({get}) => {
    const networkCount = get(networkAtom);
    const messageCount = get(messagingAtom);
    const jobsCount = get(jobsAtom);
    const notificationCount = get(notificationAtom)
    return  networkCount  + messageCount +  jobsCount +  notificationCount
  }
})