import { useEffect, useMemo, useState } from 'react'
import {
  createConversation,
  getConversations,
  getMessages,
  getUsers,
  markMessageAsRead,
  sendMessage,
} from '../api'
import './Messages.css'

function Messages() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] =
    useState(null)

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const [users, setUsers] = useState([])
  const [userSearch, setUserSearch] = useState('')
  const [showNewChat, setShowNewChat] = useState(false)

  const [loadingConversations, setLoadingConversations] =
    useState(true)
  const [loadingMessages, setLoadingMessages] =
    useState(false)
  const [loadingUsers, setLoadingUsers] =
    useState(false)

  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation?._id) {
      loadMessages(selectedConversation._id)
    } else {
      setMessages([])
    }
  }, [selectedConversation])

  useEffect(() => {
    if (!showNewChat) {
      return
    }

    loadUsers(userSearch)
  }, [showNewChat, userSearch])

  const loadConversations = async () => {
    try {
      setLoadingConversations(true)
      setError('')

      const data = await getConversations()

      const loadedConversations =
        data.conversations || []

      setConversations(loadedConversations)

      if (loadedConversations.length > 0) {
        setSelectedConversation(
          loadedConversations[0]
        )
      } else {
        setSelectedConversation(null)
      }
    } catch (error) {
      console.error(
        'Failed to load conversations:',
        error
      )

      setError(
        error.message ||
          'Failed to load conversations'
      )
    } finally {
      setLoadingConversations(false)
    }
  }

  const loadMessages = async (conversationId) => {
    try {
      setLoadingMessages(true)
      setError('')

      const data =
        await getMessages(conversationId)

      const loadedMessages =
        data.messages || []

      setMessages(loadedMessages)

      for (const message of loadedMessages) {
        if (!message.read) {
          try {
            await markMessageAsRead(message._id)
          } catch (readError) {
            console.error(
              'Failed to mark message as read:',
              readError
            )
          }
        }
      }
    } catch (error) {
      console.error(
        'Failed to load messages:',
        error
      )

      setError(
        error.message ||
          'Failed to load messages'
      )
    } finally {
      setLoadingMessages(false)
    }
  }

  const loadUsers = async (search) => {
    try {
      setLoadingUsers(true)

      const data = await getUsers(search)

      setUsers(data.users || [])
    } catch (error) {
      console.error(
        'Failed to load users:',
        error
      )

      setUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }

  const getOtherParticipant = (conversation) => {
    if (
      !conversation ||
      !conversation.participants
    ) {
      return null
    }

    return conversation.participants[0] || null
  }

  const selectedUser = useMemo(
    () =>
      getOtherParticipant(
        selectedConversation
      ),
    [selectedConversation]
  )

  const formatMessageTime = (value) => {
    if (!value) {
      return ''
    }

    return new Date(value).toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    )
  }

  const formatConversationTime = (value) => {
    if (!value) {
      return ''
    }

    const date = new Date(value)
    const today = new Date()

    if (
      date.toDateString() ===
      today.toDateString()
    ) {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    return date.toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
    })
  }

  const handleSelectConversation = (
    conversation
  ) => {
    setSelectedConversation(conversation)
    setShowNewChat(false)
    setError('')
  }

  const handleStartConversation = async (
    userId
  ) => {
    try {
      setError('')

      const data =
        await createConversation(userId)

      const newConversation =
        data.conversation

      setShowNewChat(false)
      setUserSearch('')

      const alreadyExists =
        conversations.some(
          (conversation) =>
            conversation._id ===
            newConversation._id
        )

      if (!alreadyExists) {
        setConversations((current) => [
          newConversation,
          ...current,
        ])
      }

      setSelectedConversation(
        newConversation
      )
    } catch (error) {
      console.error(
        'Failed to start conversation:',
        error
      )

      setError(
        error.message ||
          'Failed to start conversation'
      )
    }
  }

  const handleSendMessage = async (
    event
  ) => {
    event.preventDefault()

    if (
      !newMessage.trim() ||
      !selectedConversation ||
      sending
    ) {
      return
    }

    try {
      setSending(true)
      setError('')

      const data = await sendMessage(
        selectedConversation._id,
        newMessage.trim()
      )

      const createdMessage =
        data.data

      setMessages((current) => [
        ...current,
        createdMessage,
      ])

      setNewMessage('')

      setConversations((current) =>
        current.map((conversation) =>
          conversation._id ===
          selectedConversation._id
            ? {
                ...conversation,
                updatedAt:
                  createdMessage.createdAt,
              }
            : conversation
        )
      )
    } catch (error) {
      console.error(
        'Failed to send message:',
        error
      )

      setError(
        error.message ||
          'Failed to send message'
      )
    } finally {
      setSending(false)
    }
  }

  const handleSearchChange = (event) => {
    setUserSearch(event.target.value)
  }

  const getUserInitial = (user) => {
    if (!user?.name) {
      return '?'
    }

    return user.name
      .charAt(0)
      .toUpperCase()
  }

  return (
    <div className="messages-page">

      <section className="messages-header">
        <h1>Messages</h1>

        <p>
          Connect with students and communicate
          directly on campus.
        </p>
      </section>

      <section className="chat-container">

        <aside className="conversation-list">

          <div className="conversation-header">

            <div className="conversation-header-row">
              <h2>Chats</h2>

              <button
                type="button"
                className="new-chat-button"
                onClick={() =>
                  setShowNewChat(
                    (current) => !current
                  )
                }
              >
                + New Chat
              </button>
            </div>

            {showNewChat && (
              <div className="new-chat-panel">

                <input
                  type="text"
                  value={userSearch}
                  onChange={
                    handleSearchChange
                  }
                  placeholder="Search students..."
                />

                {loadingUsers ? (
                  <p className="new-chat-status">
                    Searching...
                  </p>
                ) : users.length > 0 ? (
                  <div className="user-search-results">

                    {users.map((user) => (
                      <button
                        type="button"
                        className="user-search-item"
                        key={user._id}
                        onClick={() =>
                          handleStartConversation(
                            user._id
                          )
                        }
                      >

                        <div className="user-search-avatar">
                          {getUserInitial(user)}
                        </div>

                        <div className="user-search-info">
                          <strong>
                            {user.name}
                          </strong>

                          <span>
                            {user.department ||
                              'Campus student'}
                            {user.year
                              ? ` • Year ${user.year}`
                              : ''}
                          </span>
                        </div>

                      </button>
                    ))}

                  </div>
                ) : (
                  <p className="new-chat-status">
                    No students found.
                  </p>
                )}

              </div>
            )}

          </div>

          {loadingConversations ? (
            <p className="no-conversations">
              Loading chats...
            </p>
          ) : conversations.length > 0 ? (
            conversations.map(
              (conversation) => {
                const otherUser =
                  getOtherParticipant(
                    conversation
                  )

                return (
                  <button
                    type="button"
                    className={
                      selectedConversation?._id ===
                      conversation._id
                        ? 'conversation active'
                        : 'conversation'
                    }
                    key={conversation._id}
                    onClick={() =>
                      handleSelectConversation(
                        conversation
                      )
                    }
                  >

                    <div className="conversation-avatar">
                      {getUserInitial(
                        otherUser
                      )}
                    </div>

                    <div className="conversation-info">

                      <div className="conversation-top">

                        <strong>
                          {otherUser?.name ||
                            'Campus student'}
                        </strong>

                        <span>
                          {formatConversationTime(
                            conversation.updatedAt
                          )}
                        </span>

                      </div>

                      <p>
                        Click to open conversation
                      </p>

                    </div>

                  </button>
                )
              }
            )
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
                  {getUserInitial(
                    selectedUser
                  )}
                </div>

                <div>
                  <h2>
                    {selectedUser?.name ||
                      'Campus student'}
                  </h2>

                  <span>
                    {selectedUser?.department ||
                      'Campus student'}
                    {selectedUser?.year
                      ? ` • Year ${selectedUser.year}`
                      : ''}
                  </span>
                </div>

              </div>

              {error && (
                <div className="messages-error">
                  {error}
                </div>
              )}

              <div className="chat-messages">

                {loadingMessages ? (
                  <div className="empty-chat">
                    <h2>
                      Loading messages...
                    </h2>
                  </div>
                ) : messages.length > 0 ? (
                  messages.map((message) => {

                    const isOwnMessage =
                      String(
                        message.sender?._id
                      ) !==
                      String(
                        selectedUser?._id
                      )

                    return (
                      <div
                        className={
                          isOwnMessage
                            ? 'message-row own'
                            : 'message-row'
                        }
                        key={message._id}
                      >

                        <div className="message-bubble">

                          <p>
                            {message.text}
                          </p>

                          <span>
                            {formatMessageTime(
                              message.createdAt
                            )}
                          </span>

                        </div>

                      </div>
                    )
                  })
                ) : (
                  <div className="empty-chat">
                    <h2>
                      Start the conversation
                    </h2>

                    <p>
                      Send the first message to{' '}
                      {selectedUser?.name ||
                        'this student'}.
                    </p>
                  </div>
                )}

              </div>

              <form
                className="message-input-area"
                onSubmit={
                  handleSendMessage
                }
              >

                <input
                  type="text"
                  value={newMessage}
                  onChange={(event) =>
                    setNewMessage(
                      event.target.value
                    )
                  }
                  placeholder="Type a message..."
                  maxLength={2000}
                  disabled={sending}
                />

                <button
                  type="submit"
                  disabled={
                    sending ||
                    !newMessage.trim()
                  }
                >
                  {sending
                    ? 'Sending...'
                    : 'Send'}
                </button>

              </form>

            </>
          ) : (
            <div className="empty-chat">

              <div className="empty-chat-icon">
                💬
              </div>

              <h2>
                Start a conversation
              </h2>

              <p>
                Choose an existing chat or click
                <strong> + New Chat </strong>
                to message another student.
              </p>

            </div>
          )}

        </main>

      </section>

    </div>
  )
}

export default Messages