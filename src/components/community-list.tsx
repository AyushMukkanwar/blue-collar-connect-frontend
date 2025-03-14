import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Community } from "@/lib/types"

interface CommunityListProps {
  communities: Community[]
}

export default function CommunityList({ communities }: CommunityListProps) {
  return (
    <div className="space-y-4">
      {communities.map((community) => (
        <div
          key={community.id}
          className="flex items-center justify-between border-b border-blue-100 pb-4 last:border-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
              {community.name.charAt(0)}
            </div>
            <div>
              <Link href={`/community/${community.id}`} className="text-blue-600 font-medium hover:underline">
                {community.name}
              </Link>
              <p className="text-sm text-gray-500">{community.members} members</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            Join
          </Button>
        </div>
      ))}
    </div>
  )
}

