import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { communities } from "@/lib/data"
import PostItem from "@/components/post-item"

interface CommunityPageProps {
  params: {
    id: string
  }
}

export default function CommunityPage({ params }: CommunityPageProps) {
  const community = communities.find((c) => c.id === params.id) || communities[0]

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-32 bg-blue-600"></div>
            <div className="p-6 relative">
              <div className="absolute -top-12 left-6 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl border-4 border-white">
                {community.name.charAt(0)}
              </div>
              <div className="ml-24">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-blue-600">{community.name}</h1>
                    <p className="text-gray-500 text-sm">{community.members} members</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Join Community</Button>
                </div>
                <p className="mt-4 text-gray-700">{community.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">Create Post</h2>
                <div className="space-y-4">
                  <Input placeholder="Title" className="border-blue-200" />
                  <Textarea placeholder="What's on your mind?" className="min-h-[100px] border-blue-200" />
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        Add Image
                      </Button>
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" x2="9.01" y1="9" y2="9" />
                          <line x1="15" x2="15.01" y1="9" y2="9" />
                        </svg>
                        Add Emoji
                      </Button>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Post</Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-600">Recent Posts</h2>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Sort by: </span>
                    <select className="bg-transparent text-blue-600 font-medium">
                      <option>Newest</option>
                      <option>Most Popular</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {community.posts.map((post) => (
                    <PostItem key={post.id} post={post} communityId={community.id} communityName={community.name} />
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">About {community.name}</h2>
                <p className="text-gray-700 mb-4">{community.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span className="text-gray-700">{community.members} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M21 9H3" />
                      <path d="M8 3v18" />
                    </svg>
                    <span className="text-gray-700">Created {community.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                    <span className="text-gray-700">Moderated by {community.moderator}</span>
                  </div>
                </div>
                <div className="border-t border-blue-100 mt-4 pt-4">
                  <h3 className="text-md font-medium text-blue-600 mb-2">Community Rules</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                    <li>Be respectful to other members</li>
                    <li>No spam or self-promotion</li>
                    <li>Stay on topic</li>
                    <li>No hate speech or harassment</li>
                  </ol>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">Similar Communities</h2>
                <div className="space-y-3">
                  {communities
                    .filter((c) => c.id !== community.id)
                    .slice(0, 3)
                    .map((community) => (
                      <div key={community.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {community.name.charAt(0)}
                        </div>
                        <div>
                          <Link
                            href={`/community/${community.id}`}
                            className="text-blue-600 font-medium hover:underline"
                          >
                            {community.name}
                          </Link>
                          <p className="text-xs text-gray-500">{community.members} members</p>
                        </div>
                      </div>
                    ))}
                </div>
                <Button variant="outline" className="w-full mt-4 text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Link href="/communities">View All Communities</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

