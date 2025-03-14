import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function CreateCommunityPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1">
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
                className="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Create a New Community</h1>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Community Name</Label>
                <Input id="name" placeholder="Enter a unique name for your community" className="border-blue-200" />
                <p className="text-xs text-gray-500">Community names cannot be changed once created</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Community Description</Label>
                <Textarea
                  id="description"
                  placeholder="What is your community about?"
                  className="min-h-[100px] border-blue-200"
                />
                <p className="text-xs text-gray-500">This will be displayed to potential members</p>
              </div>

              <div className="space-y-2">
                <Label>Community Type</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-blue-200 rounded-lg p-4 hover:border-blue-600 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="public" name="type" className="text-blue-600" />
                      <Label htmlFor="public" className="cursor-pointer">
                        Public
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Anyone can view and join</p>
                  </div>
                  <div className="border border-blue-200 rounded-lg p-4 hover:border-blue-600 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="restricted" name="type" className="text-blue-600" />
                      <Label htmlFor="restricted" className="cursor-pointer">
                        Restricted
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Anyone can view, but you approve members</p>
                  </div>
                  <div className="border border-blue-200 rounded-lg p-4 hover:border-blue-600 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="private" name="type" className="text-blue-600" />
                      <Label htmlFor="private" className="cursor-pointer">
                        Private
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Only approved members can view and join</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Community Topics</Label>
                <div className="flex flex-wrap gap-2">
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    Construction
                  </div>
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    Plumbing
                  </div>
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    Electrical
                  </div>
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    Carpentry
                  </div>
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    Welding
                  </div>
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    Painting
                  </div>
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    Landscaping
                  </div>
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    HVAC
                  </div>
                  <div className="border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                    + Add Custom
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Community Rules</Label>
                <div className="border border-blue-200 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        <input type="checkbox" id="rule1" className="text-blue-600" />
                      </div>
                      <div>
                        <Label htmlFor="rule1" className="font-medium">
                          Be respectful to other members
                        </Label>
                        <p className="text-xs text-gray-500">Treat others as you would like to be treated</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        <input type="checkbox" id="rule2" className="text-blue-600" />
                      </div>
                      <div>
                        <Label htmlFor="rule2" className="font-medium">
                          No spam or self-promotion
                        </Label>
                        <p className="text-xs text-gray-500">
                          Don't post content that is spam or solely for self-promotion
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        <input type="checkbox" id="rule3" className="text-blue-600" />
                      </div>
                      <div>
                        <Label htmlFor="rule3" className="font-medium">
                          Stay on topic
                        </Label>
                        <p className="text-xs text-gray-500">Keep posts relevant to the community topic</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        <input type="checkbox" id="rule4" className="text-blue-600" />
                      </div>
                      <div>
                        <Label htmlFor="rule4" className="font-medium">
                          No hate speech or harassment
                        </Label>
                        <p className="text-xs text-gray-500">Don't post content that promotes hate or harassment</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                      + Add Custom Rule
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-100">
                <div className="flex justify-end gap-4">
                  <Button variant="outline" className="border-blue-200">
                    <Link href="/">Cancel</Link>
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Create Community</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

