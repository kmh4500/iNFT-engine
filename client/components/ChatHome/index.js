import ChatComponent from '../ChatComponent'

export default function ChatHome ({name}) {
  return (
    <main>
      <h1 className="title">Chat with {name}</h1>
      <ChatComponent name={name} />
    </main>
  )
}
