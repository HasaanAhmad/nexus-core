"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTasks, FaUserCircle, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";

interface Task {
  title: string;
  assignee: string;
  priority: "High" | "Medium";
  status: string;
}

interface Message {
  user: string;
  message: string;
  time: string;
  avatar: string;
}

interface Channel {
  name: string;
  messages: Message[];
}

const ProductVisuals = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragTask, setDragTask] = useState<Task | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingUser, setCurrentTypingUser] = useState<string | null>(null);
  const [demoTask, setDemoTask] = useState<Task | null>(null);
  const [sourceColumn, setSourceColumn] = useState<number>(0);
  const [targetColumn, setTargetColumn] = useState<number>(1);
  const [kanbanState, setKanbanState] = useState([
    { 
      title: "Backlog", 
      color: "bg-gray-50", 
      tasks: [
        { title: "Implement Nexus Core OAuth 2.0", assignee: "Alex Chen", priority: "High", status: "New" },
        { title: "Nexus Core Design System Updates", assignee: "Sarah Miller", priority: "Medium", status: "In Review" }
      ] 
    },
    { 
      title: "In Progress", 
      color: "bg-blue-50", 
      tasks: [
        { title: "Nexus Core API Gateway Integration", assignee: "Mike Johnson", priority: "High", status: "In Progress" },
        { title: "Nexus Core Database Optimization", assignee: "Emma Davis", priority: "High", status: "In Progress" }
      ] 
    },
    { 
      title: "Review", 
      color: "bg-purple-50", 
      tasks: [
        { title: "Nexus Core Frontend Performance", assignee: "David Kim", priority: "Medium", status: "QA" },
        { title: "Nexus Core Security Audit", assignee: "Lisa Wong", priority: "High", status: "Code Review" }
      ] 
    },
    { 
      title: "Done", 
      color: "bg-green-50", 
      tasks: [
        { title: "Nexus Core User Authentication", assignee: "John Smith", priority: "High", status: "Completed" },
        { title: "Nexus Core CI/CD Pipeline", assignee: "Rachel Green", priority: "High", status: "Deployed" }
      ] 
    }
  ]);
  const [chatState, setChatState] = useState([
    {
      name: "Engineering",
      messages: [
        { user: "Mike Johnson", message: "Just pushed the new API endpoints using Nexus Core. Ready for review!", time: "10:30 AM", avatar: "👨‍💻" },
        { user: "Emma Davis", message: "Great! I'll review the changes after lunch. The Nexus Core API integration looks solid.", time: "10:32 AM", avatar: "👩‍💻" },
        { user: "David Kim", message: "Don't forget about the performance testing we discussed for the Nexus Core gateway.", time: "10:35 AM", avatar: "👨‍💻" }
      ]
    },
    {
      name: "Design",
      messages: [
        { user: "Sarah Miller", message: "New Nexus Core design system components are ready for implementation", time: "11:00 AM", avatar: "👩‍🎨" },
        { user: "Alex Chen", message: "The new Nexus Core color palette looks amazing! Great brand consistency.", time: "11:05 AM", avatar: "👨‍🎨" },
        { user: "Rachel Green", message: "Users will love the new Nexus Core UI improvements we've designed.", time: "11:08 AM", avatar: "👩‍🎨" }
      ]
    }
  ]);
  const [animationPosition, setAnimationPosition] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    width: 0,
    height: 0
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeChannel, setActiveChannel] = useState<number | null>(null);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Specific task animation that moves back and forth
  useEffect(() => {
    // Define fixed columns for animation (In Progress -> Review -> In Progress)
    const fixedSourceIdx = 1; // In Progress (2nd column)
    const fixedTargetIdx = 2; // Review (3rd column)
    const fixedTaskIdx = 0; // First task
    
    let mounted = true;
    let animationTimer: NodeJS.Timeout;
    
    // Define the task we want to animate
    const taskToMove = {
      title: "Nexus Core API Gateway Integration",
      assignee: "Mike Johnson",
      priority: "High" as const,
      status: "In Progress"
    };
    
    // Initialize state only once
    const initializeState = () => {
      // Only run this once
      if (mounted) {
        // Make a copy to avoid directly mutating state
        const initialState = JSON.parse(JSON.stringify(kanbanState));
        
        // Ensure task exists in source column
        const taskExists = initialState[fixedSourceIdx].tasks.some(
          (t: any) => t.title === taskToMove.title
        );
        
        if (!taskExists) {
          initialState[fixedSourceIdx].tasks = [
            taskToMove,
            ...initialState[fixedSourceIdx].tasks.filter(
              (t: any) => t.title !== taskToMove.title
            )
          ];
          
          // Update state without triggering another effect run
          setKanbanState(initialState);
        }
      }
    };
    
    // Run initialization once
    initializeState();
    
    const runAnimation = () => {
      if (isAnimating || !mounted) return;
      
      // Check for mobile screens and skip animation if too small
      if (window.innerWidth < 640) {
        return;
      }
      
      // Set animation flag
      setIsAnimating(true);
      
      // Set animation phase
      setAnimationPhase(1); // First phase - moving to target
      
      // Set column indices for visual highlighting
      setSourceColumn(fixedSourceIdx);
      setTargetColumn(fixedTargetIdx);
      
      // Delay to ensure DOM is ready
      setTimeout(() => {
        if (!mounted) return;
        
        // Get DOM elements from the correct columns
        const sourceElement = document.querySelector(`[data-column="${fixedSourceIdx}"]`);
        const targetElement = document.querySelector(`[data-column="${fixedTargetIdx}"]`);
        
        if (!sourceElement || !targetElement) {
          setIsAnimating(false);
          return;
        }
        
        // Get task element from second column
        const taskElements = sourceElement.querySelectorAll('.task-card');
        if (!taskElements || !taskElements[fixedTaskIdx]) {
          setIsAnimating(false);
          return;
        }
        
        const taskElement = taskElements[fixedTaskIdx];
        const taskRect = taskElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        // Set animation positions using the actual DOM positions
        setAnimationPosition({
          startX: taskRect.left,
          startY: taskRect.top,
          endX: targetRect.left + (targetRect.width - taskRect.width) / 2,
          endY: targetRect.top + 80,
          width: taskRect.width,
          height: taskRect.height
        });
        
        // Start animation by showing task
        setDemoTask(taskToMove as Task);
        
        // Remove task from source column (In Progress)
        setKanbanState(prevState => {
          const newState = JSON.parse(JSON.stringify(prevState));
          newState[fixedSourceIdx].tasks = newState[fixedSourceIdx].tasks.filter(
            (t: any) => t.title !== taskToMove.title
          );
          return newState;
        });
        
        // After animation completes, add to target column (Review)
        setTimeout(() => {
          if (!mounted) return;
          
          // Hide animated task
          setDemoTask(null);
          
          // Add task to target column (Review)
          setKanbanState(prevState => {
            const newState = JSON.parse(JSON.stringify(prevState));
            newState[fixedTargetIdx].tasks = [
              taskToMove,
              ...newState[fixedTargetIdx].tasks.filter(
                (t: any) => t.title !== taskToMove.title
              )
            ];
            return newState;
          });
          
          // Wait before moving back
          setTimeout(() => {
            if (!mounted) return;
            
            // Set animation phase
            setAnimationPhase(2); // Second phase - moving back

            // Get updated DOM elements
            const updatedSourceElement = document.querySelector(`[data-column="${fixedTargetIdx}"]`); // Now Review
            const updatedTargetElement = document.querySelector(`[data-column="${fixedSourceIdx}"]`); // Now In Progress
            
            if (!updatedSourceElement || !updatedTargetElement) {
              setIsAnimating(false);
              return;
            }
            
            // Get updated task element position from Review column
            const updatedTaskElements = updatedSourceElement.querySelectorAll('.task-card');
            if (!updatedTaskElements || !updatedTaskElements[0]) {
              setIsAnimating(false);
              return;
            }
            
            const updatedTaskRect = updatedTaskElements[0].getBoundingClientRect();
            const updatedTargetRect = updatedTargetElement.getBoundingClientRect();
            
            // Flip the target and source for visual effect
            setSourceColumn(fixedTargetIdx); // Now Review is source
            setTargetColumn(fixedSourceIdx); // Now In Progress is target
            
            // Update animation positions with actual DOM positions
            setAnimationPosition({
              startX: updatedTaskRect.left,
              startY: updatedTaskRect.top,
              endX: updatedTargetRect.left + (updatedTargetRect.width - updatedTaskRect.width) / 2,
              endY: updatedTargetRect.top + 80,
              width: updatedTaskRect.width,
              height: updatedTaskRect.height
            });
            
            // Start return animation
            setDemoTask(taskToMove as Task);
            
            // Remove from Review
            setKanbanState(prevState => {
              const newState = JSON.parse(JSON.stringify(prevState));
              newState[fixedTargetIdx].tasks = newState[fixedTargetIdx].tasks.filter(
                (t: any) => t.title !== taskToMove.title
              );
              return newState;
            });
            
            // After animation completes, add back to In Progress
            setTimeout(() => {
              if (!mounted) return;
              
              // Hide animated task
              setDemoTask(null);
              
              // Add back to In Progress
              setKanbanState(prevState => {
                const newState = JSON.parse(JSON.stringify(prevState));
                newState[fixedSourceIdx].tasks = [
                  taskToMove,
                  ...newState[fixedSourceIdx].tasks.filter(
                    (t: any) => t.title !== taskToMove.title
                  )
                ];
                return newState;
              });
              
              // Reset animation state
              setTimeout(() => {
                if (!mounted) return;
                setIsAnimating(false);
                setAnimationPhase(0);
              }, 500);
            }, 1000);
          }, 2000);
        }, 1000);
      }, 100);
    };
    
    // Start first animation after delay
    const initialTimer = setTimeout(() => {
      if (mounted) {
        runAnimation();
      }
    }, 2000);
    
    // Set up interval for repeated animations
    animationTimer = setInterval(() => {
      if (!isAnimating && mounted) {
        runAnimation();
      }
    }, 6000);
    
    // Clean up
    return () => {
      mounted = false;
      clearTimeout(initialTimer);
      clearInterval(animationTimer);
    };
  }, []); // Empty dependency array to run only once

  // Enhanced chat animation effect
  useEffect(() => {
    const maxMessages = 5; // Maximum number of messages to show per channel
    let currentChannelIndex = 0; // Track which channel to update
    let isInitialLoad = true;
    
    // Show initial typing immediately after component mount
    setIsTyping(true);
    setCurrentTypingUser("Mike Johnson");
    setActiveChannel(0);
    
    setTimeout(() => {
      if (!isInitialLoad) return;
      
      setIsTyping(false);
      setCurrentTypingUser(null);
      
      // Add a first message without animation
      setChatState(prevState => {
        const newChatState = [...prevState];
        const newMessage = {
          user: "Mike Johnson",
          message: "Just pushed the Nexus Core API integration. Looks solid!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: "👨‍💻"
        };
        newChatState[0].messages = [...newChatState[0].messages, newMessage];
        
        // Ensure we don't exceed max messages
        if (newChatState[0].messages.length > maxMessages) {
          newChatState[0].messages.shift();
        }
        
        return newChatState;
      });
      
      isInitialLoad = false;
    }, 2000);
    
    const chatInterval = setInterval(() => {
      if (isInitialLoad) return; // Don't start interval until initial load is complete
      
      // Alternate between channels
      const channelIndex = currentChannelIndex;
      currentChannelIndex = (currentChannelIndex + 1) % 2; // Toggle between 0 and 1
      
      const channel = chatState[channelIndex];
      
      // Engineering team members
      const engineeringUsers = [
        { user: "Mike Johnson", avatar: "👨‍💻" },
        { user: "Emma Davis", avatar: "👩‍💻" },
        { user: "David Kim", avatar: "👨‍💻" },
        { user: "Aisha Patel", avatar: "👩‍💻" }
      ];
      
      // Design team members
      const designUsers = [
        { user: "Sarah Miller", avatar: "👩‍🎨" },
        { user: "Alex Chen", avatar: "👨‍🎨" },
        { user: "Rachel Green", avatar: "👩‍🎨" },
        { user: "Jason Lee", avatar: "👨‍🎨" }
      ];
      
      // Select a random user based on the channel
      const userList = channelIndex === 0 ? engineeringUsers : designUsers;
      const randomUserIndex = Math.floor(Math.random() * userList.length);
      const selectedUser = userList[randomUserIndex];
      
      // Reset any previous typing indicators
      setIsTyping(false);
      setCurrentTypingUser(null);
      
      // After a brief pause, show typing in the current channel
      setTimeout(() => {
        setIsTyping(true);
        setCurrentTypingUser(selectedUser.user);
        // Also store which channel is active for the typing indicator
        setActiveChannel(channelIndex);
        
        // Add new message after typing
        setTimeout(() => {
          setIsTyping(false);
          setCurrentTypingUser(null);
          
          // Create new message with channel-specific content and random user
          const newMessage = {
            user: selectedUser.user,
            message: getRandomMessage(channelIndex),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: selectedUser.avatar
          };
          
          // Update chat state while limiting max messages
          setChatState(prevState => {
            const newChatState = [...prevState];
            
            // Add new message and limit to max messages by removing oldest
            const updatedMessages = [...newChatState[channelIndex].messages, newMessage];
            if (updatedMessages.length > maxMessages) {
              updatedMessages.shift(); // Remove the oldest message
            }
            
            newChatState[channelIndex].messages = updatedMessages;
            return newChatState;
          });
        }, 2000);
      }, 1000);
    }, 8000); // Increased interval to make the effect more natural

    return () => clearInterval(chatInterval);
  }, []); // Remove chatState dependency to prevent multiple updates

  // Helper function to generate random messages specific to each channel
  const getRandomMessage = (channelIndex: number) => {
    const engineeringMessages = [
      "Just finished implementing the Nexus Core authentication service!",
      "Can someone review my PR for the Nexus Core API integration?",
      "The Nexus Core backend is scaling beautifully under load.",
      "I've updated the Nexus Core documentation for developers.",
      "The tests for Nexus Core's new features are all passing now.",
      "Need help optimizing the Nexus Core database queries.",
      "Nexus Core's microservices architecture is really paying off.",
      "Just fixed that bug in the Nexus Core event handling system.",
      "The new Nexus Core deployment pipeline reduced our time to market.",
      "Nexus Core's security protocols passed all vulnerability tests."
    ];
    
    const designMessages = [
      "The new Nexus Core dashboard layout is getting great feedback!",
      "Nexus Core's accessibility improvements are making a huge difference.",
      "Just finished the animations for the Nexus Core onboarding flow.",
      "The Nexus Core design system is now fully documented.",
      "User testing shows great satisfaction with Nexus Core's interface.",
      "The new Nexus Core mobile responsive design works beautifully.",
      "Just finalized the iconography for Nexus Core's feature set.",
      "Nexus Core's dark mode implementation looks sleek!",
      "The typography in Nexus Core's UI has been optimized for readability.",
      "Our clients love the customizable themes in Nexus Core's portal."
    ];
    
    return channelIndex === 0 
      ? engineeringMessages[Math.floor(Math.random() * engineeringMessages.length)]
      : designMessages[Math.floor(Math.random() * designMessages.length)];
  };

  const handleDragStart = (task: Task) => {
    setIsDragging(true);
    setDragTask(task);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragTask(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Enterprise-Grade Project Management
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
              Streamline your workflow with our comprehensive project management and team collaboration platform
            </p>
          </motion.div>
        </div>

        {/* Kanban Board Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <FaTasks className="text-2xl sm:text-3xl text-blue-600 mr-2 sm:mr-4" />
              <h3 className="text-2xl sm:text-3xl font-bold">Project Management</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {kanbanState.map((column, index) => (
                <motion.div
                  key={column.title}
                  data-column={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${column.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${index === targetColumn ? 'ring-2 ring-blue-400 ring-opacity-50' : ''} relative overflow-hidden flex flex-col`}
                  style={{ height: '350px' }}
                >
                  {index === 0 && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs py-1 px-2 rounded-full">
                      Nexus Core
                    </div>
                  )}
                  <h4 className="text-xl font-bold mb-4 text-gray-800">{column.title}</h4>
                  <div className="space-y-4 flex-1 overflow-y-auto">
                    {column.tasks.map((task, taskIndex) => (
                      <motion.div
                        key={`${task.title}-${taskIndex}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: taskIndex * 0.1 }}
                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 task-card"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{task.title}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.priority === "High" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FaUserCircle className="text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{task.assignee}</span>
                          </div>
                          <span className="text-xs text-gray-500">{task.status}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Beautiful Task Animation */}
            <AnimatePresence>
              {demoTask && (
                <motion.div
                  key={`animated-task-${demoTask.title}-${animationPhase}`}
                  initial={{ 
                    opacity: 0,
                    scale: 0.9,
                    x: isMobile ? window.innerWidth / 2 - 150 : animationPosition.startX, 
                    y: animationPosition.startY,
                    width: animationPosition.width,
                    height: animationPosition.height,
                    rotate: 0
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1.05,
                    x: isMobile ? window.innerWidth / 2 - 150 : animationPosition.endX,
                    y: animationPosition.endY,
                    width: animationPosition.width,
                    height: animationPosition.height,
                    rotate: [0, 2, -2, 0]
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 1,
                    rotate: 0
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.2, 0.65, 0.3, 0.9],
                    rotate: {
                      duration: 0.5,
                      repeat: 0
                    }
                  }}
                  className="fixed pointer-events-none z-50 max-w-[90vw]"
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    margin: 0,
                    transform: 'none'
                  }}
                >
                  <div className="bg-white rounded-lg p-4 shadow-xl task-card h-full w-full border-2 border-blue-400">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">{demoTask.title}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        demoTask.priority === "High" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {demoTask.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaUserCircle className="text-gray-400 mr-2" />
                        <span className="text-xs sm:text-sm text-gray-600">{demoTask.assignee}</span>
                      </div>
                      <span className="text-xs text-gray-500">{demoTask.status}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Team Communication Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <FaComments className="text-2xl sm:text-3xl text-blue-600 mr-2 sm:mr-4" />
              <h3 className="text-2xl sm:text-3xl font-bold">Team Communication</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {chatState.map((channel, channelIndex) => (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, x: channelIndex === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 rounded-xl p-6 flex flex-col"
                  style={{ height: '500px' }}
                >
                  <h4 className="text-xl font-bold mb-4 text-gray-800">{channel.name}</h4>
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {channel.messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className="text-xl sm:text-2xl">{msg.avatar}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1 flex-wrap">
                                <span className="font-semibold text-gray-800 text-sm sm:text-base">{msg.user}</span>
                                <span className="text-xs sm:text-sm text-gray-500">{msg.time}</span>
                              </div>
                              <p className="text-sm sm:text-base text-gray-700 break-words">
                                {msg.message.includes("Nexus Core") ? (
                                  <>
                                    {msg.message.split("Nexus Core")[0]}
                                    <span className="text-blue-600 font-medium">Nexus Core</span>
                                    {msg.message.split("Nexus Core")[1]}
                                  </>
                                ) : msg.message}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Typing Indicator - positioned at bottom of message area */}
                    <AnimatePresence>
                      {isTyping && currentTypingUser && activeChannel !== null && 
                       ((channelIndex === 0 && activeChannel === 0) || (channelIndex === 1 && activeChannel === 1)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="bg-white rounded-lg p-3 sm:p-4 shadow-sm mb-4"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="text-gray-500 text-xs sm:text-sm">
                              {currentTypingUser} is typing
                            </div>
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="flex space-x-1"
                            >
                              <span className="w-2 h-2 bg-gray-400 rounded-full" />
                              <span className="w-2 h-2 bg-gray-400 rounded-full" />
                              <span className="w-2 h-2 bg-gray-400 rounded-full" />
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-auto flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm">
                      <input
                        type="text"
                        placeholder={`Message ${channel.name} about Nexus Core...`}
                        className="flex-1 bg-transparent outline-none text-gray-700 text-sm sm:text-base"
                      />
                      <button className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex items-center">
                        <span className="hidden sm:inline mr-1">Send</span>
                        <FaArrowRight className="text-xs sm:text-sm" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductVisuals; 