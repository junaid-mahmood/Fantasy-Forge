import React, { useState, useEffect } from "react"
import { Users, MessageSquare, ThumbsUp, Send, TrendingUp, Award, ChevronRight, Search, ChevronDown } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { auth, db } from '../firebase'
import defaultProfilePic from '../assets/default.jpg';
import Navbar from './Navbar';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  where,
  getDoc,
  arrayRemove
} from 'firebase/firestore'
import { Box, Typography, TextField, Button, Card, CardContent, Avatar, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2847 0%, #1e3a5f 100%)",
    color: "#ffffff",
    overflowX: "hidden",
    paddingTop: "5rem", // Add padding to account for fixed navbar
  },
  main: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "2rem",
  },
  sectionTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
    color: "white",
    fontFamily: "'Russo One', sans-serif",
    background: "linear-gradient(45deg, #f3f4f6, #60a5fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  card: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    backdropFilter: "blur(8px)",
    borderRadius: "1.2rem",
    padding: "3rem",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    transition: "all 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(15, 40, 71, 0.2)",
    border: "1px solid rgba(59, 130, 246, 0.4)",
  },
  icon: {
    color: "#3b82f6",
    width: "1.5rem",
    height: "1.5rem",
    marginRight: "0.5rem",
  },
  footer: {
    borderTop: "1px solid rgba(59, 130, 246, 0.2)",
    padding: "2rem",
    textAlign: "center",
    color: "#d1d5db",
  },
  dropdownButton: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    color: "white",
    padding: "0.8rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "0.5rem",
    fontSize: "0.95rem",
  },
  dropdownItem: {
    padding: "0.8rem 1rem",
    cursor: "pointer",
    borderRadius: "0.25rem",
    transition: "all 0.2s ease",
    color: "#d1d5db",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  dropdownItemHover: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    color: "white",
  },
  replySection: {
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    borderRadius: "0.75rem",
    padding: "2.5rem",
    marginTop: "2rem",
  },
  replyCard: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: "0.75rem",
    padding: "2rem",
    marginBottom: "1.5rem",
    border: "1px solid rgba(59, 130, 246, 0.15)",
  },
  postContainer: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    backdropFilter: "blur(8px)",
    borderRadius: "1.2rem",
    padding: "3rem",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    transition: "all 0.3s ease",
    marginBottom: "3rem",
    '&:hover': {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    },
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.2rem",
  },
  avatar: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    backgroundColor: "#4299e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "1.2rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  postContent: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#f3f4f6",
    marginBottom: "1.5rem",
    padding: "0.5rem 0",
  },
  actionButton: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    color: "#d1d5db",
    padding: "0.7rem 1.2rem",
    borderRadius: "0.8rem",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    fontSize: "1rem",
    '&:hover': {
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      color: "white",
      transform: "translateY(-1px)",
    },
  },
}

const CommunityPage = () => {
  const navigate = useNavigate();
  const [hoveredElements, setHoveredElements] = useState({})
  const [activeTab, setActiveTab] = useState("feed")
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("general")
  const [showTopicDropdown, setShowTopicDropdown] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyContent, setReplyContent] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userCount, setUserCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  const topics = [
    { id: "general", name: "General Discussion" },
    { id: "basketball", name: "Basketball" },
    { id: "soccer", name: "Soccer" },
    { id: "strategy", name: "Strategy Tips" },
    { id: "news", name: "Latest News" },
  ]

  useEffect(() => {
    // Fetch posts from Firebase
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts')
        const q = query(postsRef, orderBy('timestamp', 'desc'))
        
        // Real-time listener for posts
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate().toISOString()
          }))
          setPosts(fetchedPosts)
          setLoading(false)
        })

        return () => unsubscribe()
      } catch (error) {
        console.error('Error fetching posts:', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const usersRef = collection(db, 'users')
        const snapshot = await getDocs(usersRef)
        setUserCount(snapshot.size)
      } catch (error) {
        console.error('Error fetching user count:', error)
      }
    }

    fetchUserCount()
  }, [])

  // Add auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleHover = (id, isHovered) => {
    setHoveredElements((prev) => ({
      ...prev,
      [id]: isHovered,
    }))
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (newPost.trim()) {
      try {
        await addDoc(collection(db, 'posts'), {
          content: newPost,
          authorId: user.uid,
          authorName: user.displayName || 'Anonymous',
          authorPhoto: user.photoURL || defaultProfilePic,
          timestamp: new Date().toISOString(),
          likes: []
        });
        setNewPost("")
        setShowTopicDropdown(false)
      } catch (error) {
        console.error('Error adding post:', error)
      }
    }
  }

  const handleReplySubmit = async (postId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (replyContent.trim()) {
      try {
        const postRef = doc(db, 'posts', postId)
        const newComment = {
          id: Date.now().toString(),
          author: user.displayName || "Anonymous",
          authorId: user.uid,
          authorImage: user.photoURL || defaultProfilePic,
          content: replyContent,
          timestamp: Timestamp.now()
        }
        
        await updateDoc(postRef, {
          comments: arrayUnion(newComment)
        })
        
        setReplyContent("")
        setReplyingTo(null)
      } catch (error) {
        console.error('Error adding reply:', error)
      }
    }
  }

  const handleLike = async (postId, isLiked) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const postRef = doc(db, 'posts', postId)
      if (isLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid)
        })
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid)
        })
      }
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  return (
    <div style={styles.page}>
      <Navbar currentPage="community" />
      <main style={{ ...styles.main, display: 'flex', gap: '4rem' }}>
        <div style={{ width: '380px', flexShrink: 0 }}>
          <div style={{ 
            ...styles.card, 
            top: '7rem', 
            padding: '3rem 4rem 3rem 1.5rem',
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem', 
              color: '#f3f4f6',
              paddingLeft: '0.5rem' 
            }}>Create Post</h3>
            {isAuthenticated ? (
              <Box component="form" onSubmit={handlePostSubmit} sx={{ mb: 4 }}>
                <div style={{ marginBottom: '2rem', position: 'relative' }}>
                  <div 
                    style={{
                      ...styles.dropdownButton,
                      padding: '1.2rem 1.5rem',
                      marginLeft: '-0.5rem',
                      width: 'calc(100% + 1rem)'
                    }}
                    onClick={() => setShowTopicDropdown(!showTopicDropdown)}
                  >
                    <span>{topics.find(t => t.id === selectedTopic)?.name}</span>
                    <ChevronDown size={20} style={{ opacity: 0.7 }} />
                  </div>
                  {showTopicDropdown && (
                    <div style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(15, 40, 71, 0.98)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      width: 'calc(100% + 1rem)',
                      marginLeft: '-0.5rem',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      zIndex: 10,
                      backdropFilter: 'blur(12px)',
                    }}>
                      {topics.map(topic => (
                        <div
                          key={topic.id}
                          style={{
                            ...styles.dropdownItem,
                            padding: '1.2rem 1.5rem',
                            ...(hoveredElements[`topic-${topic.id}`] ? styles.dropdownItemHover : {})
                          }}
                          onMouseEnter={() => handleHover(`topic-${topic.id}`, true)}
                          onMouseLeave={() => handleHover(`topic-${topic.id}`, false)}
                          onClick={() => {
                            setSelectedTopic(topic.id)
                            setShowTopicDropdown(false)
                          }}
                        >
                          {topic.id === 'basketball' && <Users size={20} />}
                          {topic.id === 'soccer' && <Users size={20} />}
                          {topic.id === 'general' && <MessageSquare size={20} />}
                          {topic.id === 'strategy' && <Award size={20} />}
                          {topic.id === 'news' && <TrendingUp size={20} />}
                          {topic.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your thoughts..."
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!newPost.trim()}
                >
                  Post
                </Button>
              </Box>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>Please log in to create posts</p>
                <Link 
                  to="/login"
                  style={{
                    ...styles.button,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.5rem',
                    textDecoration: 'none',
                    color: 'white'
                  }}
                >
                  <Users size={20} />
                  Log In to Post
                </Link>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <p style={{ color: '#d1d5db', fontSize: '1.2rem', marginTop: '1rem' }}>
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#d1d5db', fontSize: '1.2rem' }}>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#d1d5db', fontSize: '1.2rem' }}>No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post.id} style={styles.postContainer}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={post.authorPhoto || defaultProfilePic}
                      alt={post.authorName}
                      sx={{ mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1">
                        {post.authorName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(post.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {post.content}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => handleLike(post.id, post.likes.includes(user?.uid))}
                      disabled={!user}
                      color="primary"
                    >
                      {post.likes.includes(user?.uid) ? (
                        <ThumbUpIcon />
                      ) : (
                        <ThumbUpOutlinedIcon />
                      )}
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div style={{ width: '380px', flexShrink: 0 }}>
          <div style={{ ...styles.card, position: 'sticky', top: '7rem', padding: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2.5rem', color: '#f3f4f6' }}>
              Community Stats
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ padding: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem' }}>
                <div style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>Users</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f3f4f6' }}>{userCount}</div>
              </div>
              <div style={{ padding: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem' }}>
                <div style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '1rem' }}>Total Posts</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f3f4f6' }}>{posts.length}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2024 FantasyForge. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default CommunityPage

