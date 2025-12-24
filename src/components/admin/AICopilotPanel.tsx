import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI Admin Copilot. I can help you with reports, configurations, troubleshooting, and platform insights. What would you like to know?",
    timestamp: new Date(),
  },
];

const quickActions = [
  'Show tenants at risk of churn',
  'Generate revenue report',
  'Find failed payments today',
  'Analyze API usage trends',
];

interface AICopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AICopilotPanel({ isOpen, onClose }: AICopilotPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${input}". Let me analyze the data and provide you with relevant insights. Based on current platform metrics, I can see some interesting patterns that might help you make informed decisions.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'fixed right-4 bottom-4 z-50 bg-card border border-border rounded-2xl shadow-xl overflow-hidden',
            isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
          )}
        >
          {/* Header */}
          <div className="h-14 px-4 flex items-center justify-between bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg gradient-primary">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Copilot</h3>
                {!isMinimized && (
                  <p className="text-[10px] text-muted-foreground">Powered by GPT-4</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <ScrollArea className="h-[calc(100%-14rem)] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex gap-3',
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      )}
                    >
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback
                          className={cn(
                            message.role === 'assistant'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary'
                          )}
                        >
                          {message.role === 'assistant' ? (
                            <Sparkles className="h-4 w-4" />
                          ) : (
                            'SA'
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          'rounded-2xl px-4 py-2 max-w-[80%]',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-secondary rounded-bl-md'
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <Sparkles className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-border">
                <p className="text-[10px] text-muted-foreground mb-2">Quick actions</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="px-2.5 py-1 text-[10px] bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything about your platform..."
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}