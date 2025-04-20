import {RecoilRoot, useRecoilValue} from "recoil"
import { networkAtom, jobsAtom, notificationAtom,messagingAtom, totalMessageSelector } from "./components/atoms"

function App() {
  return(
    <RecoilRoot>
      <MainApp></MainApp>
    </RecoilRoot>
  )
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const notificationCount = useRecoilValue(notificationAtom);
  const messageCount = useRecoilValue(messagingAtom);
  const totalMessageCount = useRecoilValue(totalMessageSelector)
  return(
    <>
      <button> Home </button>
      
      <button>My network ( {networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
      <button>Jobs ({jobsCount})</button>
      <button>Messaging({ messageCount})</button>
      <button>Notification({ notificationCount})</button>
      
      <button>Me({totalMessageCount})</button>
    </>
  )
}

export default App;