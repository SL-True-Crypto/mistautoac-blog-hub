import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { User, Calendar } from 'lucide-react'
import { supabase, Comment } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface CommentSectionProps {
  postId: number
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            name: name.trim(),
            email: email.trim(),
            content: content.trim()
          }
        ])

      if (error) throw error

      toast({
        title: "Comment added successfully!",
        description: "Your comment has been posted.",
      })

      setName('')
      setEmail('')
      setContent('')
      fetchComments()
    } catch (error) {
      console.error('Error adding comment:', error)
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Write your comment here... *"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-muted/30">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{comment.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(comment.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
            {comments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CommentSection