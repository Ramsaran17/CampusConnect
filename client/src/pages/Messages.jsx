import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createConversation,
  getConversations,
  getMessages,
  getMe,
  getUsers,
  markMessageAsRead,
  sendMessage,
  uploadToCloudinary,
} from '../api'
import './Messages.css'

function Messages() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)

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
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState('')

  const fileInputRef = useRef(null)

  useEffect(() => {
    loadInitialData()
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

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview)
      }
    }
  }, [filePreview])

  const loadInitialData = async () => {
    try {
      setLoadingConversations(true)
      setError('')

      const [userData, conversationData] =
        await Promise.all([
          getMe(),
          getConversations(),
        ])

      setCurrentUser(userData.user)

      const loadedConversations =
        conversationData.conversations || []

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
        'Failed to load messaging data:',
        error
      )

      setError(
        error.message ||
          'Failed to load messages'
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
        const senderId =
          message.sender?._id

        const isOwnMessage =
          currentUser &&
          String(senderId) ===
            String(currentUser._id)

        if (!isOwnMessage && !message.read) {
          try {
            await markMessageAsRead(
              message._id
            )
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

  const getOtherParticipant = (
    conversation
  ) => {
    if (
      !conversation ||
      !Array.isArray(
        conversation.participants
      ) ||
      !currentUser
    ) {
      return null
    }

    return (
      conversation.participants.find(
        (participant) =>
          String(participant?._id) !==
          String(currentUser._id)
      ) || null
    )
  }

  const selectedUser = useMemo(
    () =>
      getOtherParticipant(
        selectedConversation
      ),
    [
      selectedConversation,
      currentUser,
    ]
  )

  const formatMessageTime = (value) => {
    if (!value) {
      return ''
    }

    const date = new Date(value)

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
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
    clearSelectedFile()
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

      setConversations((current) => {
        const alreadyExists =
          current.some(
            (conversation) =>
              conversation._id ===
              newConversation._id
          )

        if (alreadyExists) {
          return current
        }

        return [
          newConversation,
          ...current,
        ]
      })

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

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    setError('')

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ]

    if (!allowedTypes.includes(file.type)) {
      setError(
        'Only JPG, PNG, WEBP, and PDF files are allowed'
      )

      event.target.value = ''
      return
    }

    const maxSize =
      10 * 1024 * 1024

    if (file.size > maxSize) {
      setError(
        'File size must be 10 MB or less'
      )

      event.target.value = ''
      return
    }

    if (filePreview) {
      URL.revokeObjectURL(filePreview)
    }

    setSelectedFile(file)

    if (file.type.startsWith('image/')) {
      setFilePreview(
        URL.createObjectURL(file)
      )
    } else {
      setFilePreview('')
    }
  }

  const clearSelectedFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview)
    }

    setSelectedFile(null)
    setFilePreview('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSendMessage = async (
    event
  ) => {
    event.preventDefault()

    const messageText =
      newMessage.trim()

    if (
      (!messageText &&
        !selectedFile) ||
      !selectedConversation ||
      sending ||
      uploading
    ) {
      return
    }

    try {
      setSending(true)
      setError('')

      let attachment = null

      if (selectedFile) {
        setUploading(true)

        const uploadResult =
          await uploadToCloudinary(
            selectedFile
          )

        attachment = {
          url: uploadResult.secureUrl,
          publicId:
            uploadResult.publicId,
          type: selectedFile.type.startsWith(
            'image/'
          )
            ? 'image'
            : 'file',
          name: selectedFile.name,
        }

        setUploading(false)
      }

      const data = await sendMessage(
        selectedConversation._id,
        messageText,
        attachment
      )

      const createdMessage =
        data.data

      setMessages((current) => [
        ...current,
        createdMessage,
      ])

      setNewMessage('')
      clearSelectedFile()

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

      setUploading(false)
    } finally {
      setSending(false)
      setUploading(false)
    }
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

  <button
    type="button"
    className="messages-back-button"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

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
                  onChange={(event) =>
                    setUserSearch(
                      event.target.value
                    )
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
                      currentUser &&
                      String(
                        message.sender?._id
                      ) ===
                        String(
                          currentUser._id
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

                          {message.attachment?.url && (
                            <div className="message-attachment">

                              {message.attachment.type ===
                              'image' ? (
                                <a
                                  href={
                                    message
                                      .attachment
                                      .url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img
                                    src={
                                      message
                                        .attachment
                                        .url
                                    }
                                    alt={
                                      message
                                        .attachment
                                        .name ||
                                      'Message attachment'
                                    }
                                  />
                                </a>
                              ) : (
                                <a
                                  href={
                                    message
                                      .attachment
                                      .url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  className="message-file"
                                >
                                  <span className="message-file-icon">
                                    📄
                                  </span>

                                  <span className="message-file-name">
                                    {message
                                      .attachment
                                      .name ||
                                      'Attached file'}
                                  </span>
                                </a>
                              )}

                            </div>
                          )}

                          {message.text && (
                            <p>
                              {message.text}
                            </p>
                          )}

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

                    <div className="empty-chat-icon">
                      💬
                    </div>

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

              {selectedFile && (
                <div className="attachment-preview">

                  {filePreview ? (
                    <img
                      src={filePreview}
                      alt="Selected attachment"
                    />
                  ) : (
                    <div className="attachment-file-preview">
                      <span>📄</span>

                      <div>
                        <strong>
                          {selectedFile.name}
                        </strong>

                        <small>
                          PDF •{' '}
                          {(
                            selectedFile.size /
                            (1024 * 1024)
                          ).toFixed(2)}{' '}
                          MB
                        </small>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className="remove-attachment-button"
                    onClick={clearSelectedFile}
                    disabled={
                      sending || uploading
                    }
                    aria-label="Remove attachment"
                  >
                    ×
                  </button>

                </div>
              )}

              <form
                className="message-input-area"
                onSubmit={
                  handleSendMessage
                }
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                  onChange={
                    handleFileChange
                  }
                  hidden
                />

                <button
                  type="button"
                  className="attachment-button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={
                    sending || uploading
                  }
                  aria-label="Attach file"
                  title="Attach image or PDF"
                >
                  📎
                </button>

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
                  disabled={
                    sending || uploading
                  }
                />

                <button
                  type="submit"
                  disabled={
                    sending ||
                    uploading ||
                    (!newMessage.trim() &&
                      !selectedFile)
                  }
                >
                  {uploading
                    ? 'Uploading...'
                    : sending
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