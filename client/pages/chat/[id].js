import { useRouter } from 'next/router'

const Chat = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Chat: {id}</p>
}

export default Chat
