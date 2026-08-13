import { useEffect, useState } from 'react'
import './Messages.css'

const sampleConversations = [
  {
    id: 1,
    name: 'Rahul',
    lastMessage: 'Is the study table still available?',
    time: '10:30 AM',
  },
  {
    id: 2,
    name: 'Ananya',
    lastMessage: 'I found your calculator.',
    time: 'Yesterday',
  },
  {
    id: 3,
    name: 'Kiran',
    lastMessage: 'Can we meet near the main gate?',
    time: 'Monday',
  },
]

const sampleMessages = {
  1: [
    {
      id: 1,
      sender: 'them',
      text: 'Hi! Is the study table still available?',
      time: '10:25 AM',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Yes, it is still available.',
      time: '10:27 AM',
    },
    {
      id: 3,
      sender: 'them',
      text: 'Can I come and check it?',
      time: '10:30 AM',
    },
  ],
  2: [
    {
      id: 4,
      sender: 'them',
      text: 'I found your calculator.',
      time: 'Yesterday',
    },
  ],
  3: [
    {
      id: 5,
      sender: 'them',
      text: 'Can we meet near the main gate?',
      time: 'Monday',
    },
  ],
}

function Messages() {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState({})
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const savedConversations = JSON.parse(
      localStorage.getItem('campusConversations') || 'null'
    )

    const savedMessages = JSON.parse(
      localStorage.getItem('campusMessages') || 'null'
    )

    setConversations(
      savedConversations || sampleConversations
    )

    setMessages(
      savedMessages || sampleMessages
    )

    setSelectedConversation(
      (savedConversations || sampleConversations)[0] || null
    )
  }, [])

  const currentMessages = selectedConversation
    ? messages[selectedConversation.id] || []
    : []

  const handleSendMessage = (event) => {
    event.preventDefault()

    if (!newMessage.trim() || !selectedConversation) {
      return
    }

    const message = {
      id: Date.now(),
      sender: 'me',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    const updatedMessages = {
      ...messages,
      [selectedConversation.id]: [
        ...currentMessages,
        message,
      ],
    }

    const updatedConversations = conversations.map(
      (conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              lastMessage: message.text,
              time: 'Now',
            }
          : conversation
    )

    setMessages(updatedMessages)
    setConversations(updatedConversations)
    setNewMessage('')

    localStorage.setItem(
      'campusMessages',
      JSON.stringify(updatedMessages)
    )

    localStorage.setItem(
      'campusConversations',
      JSON.stringify(updatedConversations)
    )
  }

  return (
    <div className="messages-page">

      <section className="messages-header">
        <h1>Messages</h1>

        <p>
          Communicate with students and coordinate
          your campus activities.
        </p>
      </section>

      <section className="chat-container">

        <aside className="conversation-list">

          <div className="conversation-header">
            <h2>Chats</h2>
          </div>

          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <button
                className={
                  selectedConversation?.id === conversation.id
                    ? 'conversation active'
                    : 'conversation'
                }
                key={conversation.id}
                onClick={() =>
                  setSelectedConversation(conversation)
                }
              >
                <div className="conversation-avatar">
                  {conversation.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="conversation-info">
                  <div className="conversation-top">
                    <strong>
                      {conversation.name}
                    </strong>

                    <span>
                      {conversation.time}
                    </span>
                  </div>

                  <p>
                    {conversation.lastMessage}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="no-conversations">
              No conversations yet.
            </p>
          )}

        </aside>

        <main className="chat-window">

          {selectedConversation ? (
            <>
              <div className="chat-header">

                <div className="chat-avatar">
                  {selectedConversation.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h2>
                    {selectedConversation.name}
                  </h2>

                  <span>Campus student</span>
                </div>

              </div>

              <div className="chat-messages">

                {currentMessages.map((message) => (
                  <div
                    className={
                      message.sender === 'me'
                        ? 'message-row own'
                        : 'message-row'
                    }
                    key={message.id}
                  >
                    <div className="message-bubble">
                      <p>{message.text}</p>

                      <span>
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}

              </div>

              <form
                className="message-input-area"
                onSubmit={handleSendMessage}
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(event) =>
                    setNewMessage(event.target.value)
                  }
                  placeholder="Type a message..."
                />

                <button type="submit">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="empty-chat">
              <h2>Select a conversation</h2>

              <p>
                Choose a chat from the left to start
                messaging.
              </p>
            </div>
          )}

        </main>

      </section>

    </div>
  )
}

export default Messages