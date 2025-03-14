import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CommunityList from "@/components/community-list"
import { communities } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-blue-600">BlueCollar Community</h1>
            <p className="text-blue-600/80">Find jobs and connect with other workers in your industry</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500/50" />
              <Input
                type="search"
                placeholder="Search communities..."
                className="pl-8 border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/create-community">Create Community</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Popular Communities</h2>
                <CommunityList communities={communities.slice(0, 5)} />
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-600">Recent Posts</h2>
                  <Link href="/all-posts" className="text-blue-600 text-sm hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {communities.flatMap((community) =>
                    community.posts.slice(0, 1).map((post) => (
                      <div
                        key={post.id}
                        className="border border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {community.name.charAt(0)}
                          </div>
                          <Link
                            href={`/community/${community.id}`}
                            className="text-blue-600 font-medium hover:underline"
                          >
                            {community.name}
                          </Link>
                          <span className="text-gray-500 text-sm">• {post.timeAgo}</span>
                        </div>
                        <Link href={`/community/${community.id}/post/${post.id}`}>
                          <h3 className="text-lg font-medium text-blue-600 mb-2">{post.title}</h3>
                          <p className="text-gray-700 mb-3">{post.content}</p>
                          {post.image && (
                            <div className="mb-3 rounded-lg overflow-hidden">
                              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
                            </div>
                          )}
                        </Link>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-500">
                            <button className="hover:text-blue-600 p-1">
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
                                width="16"
                                height="16"
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
                              width="16"
                              height="16"
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
                        </div>
                      </div>
                    )),
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">Trending Communities</h2>
                <div className="space-y-3">
                  {communities.slice(0, 3).map((community) => (
                    <div key={community.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {community.name.charAt(0)}
                      </div>
                      <div>
                        <Link href={`/community/${community.id}`} className="text-blue-600 font-medium hover:underline">
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

              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">About BlueCollar</h2>
                <p className="text-gray-700 mb-4">
                  BlueCollar is a community platform for blue collar workers to find jobs, share experiences, and
                  connect with others in their industry.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
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
                    </div>
                    <span className="text-gray-700">{communities.reduce((acc, c) => acc + c.members, 0)} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 7h.01" />
                        <path d="M12 7h.01" />
                        <path d="M17 7h.01" />
                        <path d="M7 12h.01" />
                        <path d="M12 12h.01" />
                        <path d="M17 12h.01" />
                        <path d="M7 17h.01" />
                        <path d="M12 17h.01" />
                        <path d="M17 17h.01" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{communities.length} communities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                        <path d="M10 2c1 .5 2 2 2 5" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Created in 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

