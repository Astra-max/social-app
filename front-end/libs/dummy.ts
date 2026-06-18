import { FollowUsers, UserPersonalData, UserPostData, UserProfileData } from "@/types";


export const userProfile: UserPersonalData = {
  userId: 101,
  firstName: "Maxwel",
  secondName: "Odongo",
  nickName: "Astra Max",
  dateOfBirth: new Date("2000-08-15"),
  profileImage:
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=60",
  accountStatus: "public",
  aboutMe:
    "Full-stack developer focused on Go, React, Next.js, and scalable backend systems.",
  posts: 12,
  followers: 1540,
  following: 320,

  myPosts: [],
  saved: [],
};

export const allPostData: UserPostData[] = [
  {
    postId: 1,
    userId: 101,
    fullName: "Astra Max",
    status: "public",
    location: "Nairobi, Kenya",
    userProfileImage:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-06-04",
    description: "Setting up my new workspace today",
    postImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=60",
    likes: 120,
    comments: 14,
    shares: 5,
    tags: ["workspace", "coding", "minimal"],
    postType: "image",
  },

  {
    postId: 2,
    userId: 102,
    fullName: "Elena Rostova",
    status: "private",
    location: "Berlin, Germany",
    userProfileImage:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-06-02",
    description: "Debugging Next.js layout shifts is finally done.",
    postImage: "",
    likes: 45,
    comments: 6,
    shares: 1,
    tags: ["nextjs", "debugging"],
    postType: "text",
  },

  {
    postId: 3,
    userId: 103,
    fullName: "Marcus Vance",
    status: "public",
    location: "Cape Town, South Africa",
    userProfileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-06-02",
    description: "Morning hikes hit different 🌄",
    postImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=60",
    likes: 310,
    comments: 32,
    shares: 18,
    tags: ["nature", "hiking"],
    postType: "image",
  },

  {
    postId: 4,
    userId: 104,
    fullName: "Sarah Jenkins",
    status: "public",
    location: "London, UK",
    userProfileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-06-01",
    description: "React 19 forms feel insanely smooth.",
    postImage: "",
    likes: 90,
    comments: 10,
    shares: 2,
    tags: ["react", "frontend"],
    postType: "text",
  },

  {
    postId: 5,
    userId: 105,
    fullName: "David Chen",
    status: "private",
    location: "Tokyo, Japan",
    userProfileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-05-31",
    description: "Coffee tasting session ☕",
    postImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=60",
    likes: 210,
    comments: 22,
    shares: 9,
    tags: ["coffee", "lifestyle"],
    postType: "image",
  },

  {
    postId: 6,
    userId: 106,
    fullName: "Amina Yusuf",
    status: "public",
    location: "Lagos, Nigeria",
    userProfileImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-05-30",
    description: "Big product launch tomorrow 🚀",
    postImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=60",
    likes: 540,
    comments: 61,
    shares: 25,
    tags: ["startup", "launch"],
    postType: "image",
  },

  {
    postId: 7,
    userId: 107,
    fullName: "Liam O'Connor",
    status: "public",
    location: "Dublin, Ireland",
    userProfileImage:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-05-29",
    description: "Best animation libraries for Next.js?",
    postImage: "",
    likes: 77,
    comments: 19,
    shares: 3,
    tags: ["nextjs", "animation"],
    postType: "text",
  },

  {
    postId: 8,
    userId: 108,
    fullName: "Chloe Dubois",
    status: "private",
    location: "Paris, France",
    userProfileImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-05-28",
    description: "Golden hour shoot 📸",
    postImage:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=60",
    likes: 890,
    comments: 44,
    shares: 30,
    tags: ["photography", "goldenhour"],
    postType: "image",
  },

  {
    postId: 9,
    userId: 109,
    fullName: "Tariq Mahmood",
    status: "public",
    location: "Dubai, UAE",
    userProfileImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-05-27",
    description: "Redux vs Zustand — thoughts?",
    postImage: "",
    likes: 140,
    comments: 28,
    shares: 6,
    tags: ["redux", "zustand"],
    postType: "text",
  },

  {
    postId: 30,
    userId: 130,
    fullName: "Sophia Martinez",
    status: "private",
    location: "Madrid, Spain",
    userProfileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60",
    timePosted: "2026-05-16",
    description: "Clean architecture reading session 📚",
    postImage: "",
    likes: 88,
    comments: 11,
    shares: 2,
    tags: ["architecture", "reading"],
    postType: "text",
  },
];


export const suggestedFollows: FollowUsers[] = [
  {
    userId: 1,
    fullName: "Astra Max",
    userProfileImage:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80",
    location: "Nairobi, Kenya",
  },
  {
    userId: 2,
    fullName: "Elena Rostova",
    userProfileImage:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80",
    location: "Berlin, Germany",
  },
  {
    userId: 3,
    fullName: "Marcus Vance",
    userProfileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    location: "Cape Town, South Africa",
  },
  {
    userId: 4,
    fullName: "Amina Yusuf",
    userProfileImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    location: "Lagos, Nigeria",
  },
  {
    userId: 5,
    fullName: "David Chen",
    userProfileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    location: "Tokyo, Japan",
  },
  {
    userId: 6,
    fullName: "Chloe Dubois",
    userProfileImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
    location: "Paris, France",
  },
  {
    userId: 7,
    fullName: "Tariq Mahmood",
    userProfileImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    location: "Dubai, UAE",
  },
  {
    userId: 8,
    fullName: "Jessica Taylor",
    userProfileImage:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
    location: "New York, USA",
  },
  {
    userId: 9,
    fullName: "Liam O'Connor",
    userProfileImage:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80",
    location: "Dublin, Ireland",
  },
  {
    userId: 10,
    fullName: "Sophia Martinez",
    userProfileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    location: "Madrid, Spain",
  },
  {
    userId: 11,
    fullName: "Oliver Brooks",
    userProfileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    location: "London, UK",
  },
  {
    userId: 12,
    fullName: "Nina Peterson",
    userProfileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    location: "Toronto, Canada",
  },
  {
    userId: 13,
    fullName: "Kenji Sato",
    userProfileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    location: "Osaka, Japan",
  },
  {
    userId: 14,
    fullName: "Rachel Green",
    userProfileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    location: "Los Angeles, USA",
  },
];