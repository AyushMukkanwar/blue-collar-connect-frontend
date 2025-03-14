import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { communities } from "@/lib/data"
import CommentItem from "@/components/comment-item"

interface PostPageProps {
  params: {
    id: string
    postId: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  const community = communities.find((c) => c.id === params.id) || communities[0]
  const post = community.posts.find((p) => p.id === params.postId) || community.posts[0]

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {community.name.charAt(0)}
              </div>
              <div>
                <Link href={`/community/${community.id}`} className="text-blue-600 font-medium hover:underline">
                  {community.name}
                </Link>
                <div className="flex items-center text-xs text-gray-500">
                  <span>Posted by {post.author}</span>
                  <span className="mx-1">•</span>
                  <span>{post.timeAgo}</span>
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-blue-600 mb-4">{post.title}</h1>
            <p className="text-gray-700 mb-6">{post.content}</p>

            {post.image && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
              </div>
            )}

            <div className="flex items-center gap-4 border-t border-b border-blue-100 py-3 mb-6">
              <div className="flex items-center gap-1 text-gray-500">
                <button className="hover:text-blue-600 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-thumbs-up"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </button>
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <button className="hover:text-blue-600 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-thumbs-down"
                  >
                    <path d="M17 14V2" />
                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                  </svg>
                </button>
                <span>{post.dislikes}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-square"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{post.comments.length} comments</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 ml-auto">
                <button className="hover:text-blue-600 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark"
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </button>
                <button className="hover:text-blue-600 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-share"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <path d="m16 6-4-4-4 4" />
                    <path d="M12 2v13" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-600 mb-4">Add a Comment</h2>
              <div className="space-y-4">
                <Textarea placeholder="What are your thoughts?" className="min-h-[100px] border-blue-200" />
                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">Comment</Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-blue-600 mb-4">Comments ({post.comments.length})</h2>
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

