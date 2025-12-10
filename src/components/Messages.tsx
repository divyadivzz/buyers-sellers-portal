import { useState } from 'react';
import { Send, Paperclip, Search, ArrowLeft } from 'lucide-react';
import { Navigation } from './Navigation';
import { Avatar } from './Avatar';
import { Input } from './Input';
import { Button } from './Button';
import type { User, Conversation, Message } from '../App';

type MessagesProps = {
  currentUser: User;
  onNavigate: (screen: any) => void;
};

export function Messages({ currentUser, onNavigate }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations
  const conversations: Conversation[] = [
    {
      id: '1',
      itemId: '1',
      itemTitle: 'Ergonomic Office Chair',
      otherUser: {
        id: '2',
        name: 'Michael Torres',
        email: 'michael.torres@company.com',
        department: 'Design',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      },
      messages: [
        {
          id: '1',
          senderId: '2',
          text: 'Hi! Is this chair still available?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: '2',
          senderId: currentUser.id,
          text: 'Yes, it is! Would you like to come see it?',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        },
        {
          id: '3',
          senderId: '2',
          text: 'That would be great! When are you available?',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
        {
          id: '4',
          senderId: currentUser.id,
          text: 'I can do tomorrow afternoon around 2pm. Does that work for you?',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
        },
      ],
      lastMessage: 'I can do tomorrow afternoon around 2pm. Does that work for you?',
      lastMessageTime: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      id: '2',
      itemId: '3',
      itemTitle: 'MacBook Pro Stand',
      otherUser: {
        id: '4',
        name: 'James Kim',
        email: 'james.kim@company.com',
        department: 'Engineering',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      },
      messages: [
        {
          id: '1',
          senderId: currentUser.id,
          text: "Hey! I saw you're giving away a laptop stand. Is it still available?",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
        {
          id: '2',
          senderId: '4',
          text: 'Yes! You can pick it up from my desk anytime this week.',
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        },
      ],
      lastMessage: 'Yes! You can pick it up from my desk anytime this week.',
      lastMessageTime: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
    },
    {
      id: '3',
      itemId: '4',
      itemTitle: 'Indoor Plant Collection',
      otherUser: {
        id: '5',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        department: 'HR',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      },
      messages: [
        {
          id: '1',
          senderId: currentUser.id,
          text: "I'd love to take the plants off your hands! When can I pick them up?",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
      ],
      lastMessage: "I'd love to take the plants off your hands! When can I pick them up?",
      lastMessageTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
  ];

  const activeConversation = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 24) return formatTime(date);
    if (hours < 48) return 'Yesterday';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.itemTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentUser={currentUser}
        onNavigate={onNavigate}
        activeScreen="messages"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="grid md:grid-cols-[320px_1fr] h-full">
            {/* Conversations List */}
            <div className={`border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  icon={<Search className="w-5 h-5" />}
                />
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      selectedConversation === conversation.id ? 'bg-teal-50' : ''
                    }`}
                  >
                    <Avatar
                      src={conversation.otherUser.avatar}
                      name={conversation.otherUser.name}
                      size="md"
                    />
                    <div className="flex-1 text-left overflow-hidden">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="truncate">{conversation.otherUser.name}</p>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {formatDate(conversation.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-1">
                        Re: {conversation.itemTitle}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            {activeConversation ? (
              <div className={`flex flex-col ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                  <Button
                    onClick={() => setSelectedConversation(null)}
                    variant="ghost"
                    size="sm"
                    icon={<ArrowLeft className="w-5 h-5" />}
                    className="md:hidden"
                  >
                    Back
                  </Button>
                  <Avatar
                    src={activeConversation.otherUser.avatar}
                    name={activeConversation.otherUser.name}
                    size="md"
                  />
                  <div className="flex-1">
                    <h5>{activeConversation.otherUser.name}</h5>
                    <p className="text-sm text-gray-500">
                      {activeConversation.otherUser.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Re: {activeConversation.itemTitle}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeConversation.messages.map((message) => {
                    const isCurrentUser = message.senderId === currentUser.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                      >
                        {!isCurrentUser && (
                          <Avatar
                            src={activeConversation.otherUser.avatar}
                            name={activeConversation.otherUser.name}
                            size="sm"
                          />
                        )}
                        <div
                          className={`max-w-[70%] ${
                            isCurrentUser ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div
                            className={`px-4 py-2.5 rounded-2xl ${
                              isCurrentUser
                                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p>{message.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-1">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="p-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-center p-8 text-center">
                <div>
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="mb-2">No conversation selected</h3>
                  <p className="text-gray-600">
                    Select a conversation from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}