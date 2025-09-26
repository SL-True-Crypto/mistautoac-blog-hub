import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { supabase, BlogPost } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

const AdminPanel = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    read_time: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const postData = {
        ...formData,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        views: editingPost ? editingPost.views : 0
      }

      let error
      if (editingPost) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([postData])
        error = insertError
      }

      if (error) throw error

      toast({
        title: `Post ${editingPost ? 'updated' : 'created'} successfully!`,
        description: `The blog post has been ${editingPost ? 'updated' : 'created'}.`,
      })

      resetForm()
      fetchPosts()
    } catch (error) {
      console.error('Error saving post:', error)
      toast({
        title: "Error",
        description: `Failed to ${editingPost ? 'update' : 'create'} post. Please try again.`,
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Post deleted successfully!",
        description: "The blog post has been removed.",
      })

      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: '',
      read_time: ''
    })
    setIsAdding(false)
    setEditingPost(null)
  }

  const startEditing = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      category: post.category,
      read_time: post.read_time || post.readTime
    })
    setIsAdding(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Admin Panel</h1>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Post
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingPost ? 'Edit Post' : 'Add New Post'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC Selection">AC Selection</SelectItem>
                    <SelectItem value="Automotive AC">Automotive AC</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Refrigeration">Refrigeration</SelectItem>
                    <SelectItem value="Energy Efficiency">Energy Efficiency</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Read Time (e.g., 5 min read)"
                  value={formData.read_time}
                  onChange={(e) => setFormData({...formData, read_time: e.target.value})}
                  required
                />
              </div>
              <Textarea
                placeholder="Post Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                rows={3}
                required
              />
              <Textarea
                placeholder="Post Content (HTML allowed)"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={10}
                required
              />
              <div className="flex gap-2">
                <Button type="submit">
                  {editingPost ? 'Update Post' : 'Create Post'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-32 object-cover rounded mb-4"
              />
              <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{post.category}</p>
              <p className="text-sm text-muted-foreground mb-4">Views: {post.views}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEditing(post)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel