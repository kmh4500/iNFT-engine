import { useRouter } from 'next/router'
import Layout from "../../layouts"
import ChatHome from "../../components/ChatHome"

const Chat = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout>
      <ChatHome name={id} />
    </Layout>
  )
}

export default Chat
