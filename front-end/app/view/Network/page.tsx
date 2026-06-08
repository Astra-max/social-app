"use client";

import UserProfileImage from "@/components/header/profile/userProfile";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { suggestedFollows } from "@/libs/dummy";
import { Button } from "@/components/ui/button";
import { ButtonData, FollowUsers } from "@/types";
import style from "@/styles/followers.module.css";
import { useState } from "react";

export default function FollowersUI() {
  return (
    <DefaultLayout>
      <Followers />
    </DefaultLayout>
  );
}

export function Followers() {
  const [activeRoute, setActiveRoute] = useState<string>("Followers")

  const pastAthousand: string =
    suggestedFollows.length >= 1000
      ? "K"
      : suggestedFollows.length >= 1_000_000
        ? "M"
        : "";

  const HandleRouteChange = () => setActiveRoute("");

  return (
    <div className={style.followMainCont}>
      <div className={style.titleFollowers}>
        <p className={style.FollowerText}>{activeRoute}</p>
        <p>
          <span style={{color: "var(--primary-theme)", fontSize: "1.4rem", fontWeight: "bold"}}>{suggestedFollows.length}</span>
          {pastAthousand} followers
        </p>
      </div>
      <div></div>
      <div className={style.mappedFollowers}>
        {suggestedFollows.map((data) => (
          <People key={data.userId} data={data} />
        ))}
      </div>
    </div>
  );
}

export function People({ data }: { data: FollowUsers }) {
  const btnData: ButtonData = {
    text: "followers",
    style: { backgroundColor: "var(--primary-theme)", padding: "0.7rem 1rem" },
  };
  return (
    <div className={style.peopleCont}>
      <div className={style.imageNameLoc}>
        <div>
          <UserProfileImage url={data.userProfileImage} />
        </div>
        <div>
          <p>{data.fullName}</p>
          <p>{data.location}</p>
        </div>
      </div>
      <div>
        <Button data={btnData} />
      </div>
    </div>
  );
}

// "use client"; // Required for click handlers in Next.js App Router

// import React from "react";

// export default function MultiElementReader() {
  
//   // 1. Single unified click handler
//   // Use HTMLGenericElement or HTMLElement so it handles divs, paragraphs, etc.
//   const handleElementClick = (event: React.MouseEvent<HTMLElement>) => {
//     // Read the visible text content
//     const textContent = event.currentTarget.textContent;
    
//     // Read custom data attributes (safer and cleaner than reading raw text)
//     const elementRole = event.currentTarget.dataset.role;
//     const elementId = event.currentTarget.dataset.id;

//     console.log("--- Element Clicked ---");
//     console.log("Text:", textContent);
//     console.log("Role:", elementRole);
//     console.log("ID:", elementId);
//   };

//   return (
//     <div className="space-y-4 p-6">
//       {/* Element 1: A Paragraph */}
//       <p 
//         onClick={handleElementClick}
//         data-role="follower-count"
//         data-id="101"
//         className="p-3 bg-blue-50 cursor-pointer hover:bg-blue-100 rounded"
//       >
//         Followers: 1.2k
//       </p>

//       {/* Element 2: A Div */}
//       <div 
//         onClick={handleElementClick}
//         data-role="following-count"
//         data-id="102"
//         className="p-3 bg-green-50 cursor-pointer hover:bg-green-100 rounded"
//       >
//         Following: 450
//       </div>

//       {/* Element 3: A Heading or Span */}
//       <span 
//         onClick={handleElementClick}
//         data-role="friends-count"
//         data-id="103"
//         className="block p-3 bg-purple-50 cursor-pointer hover:bg-purple-100 rounded"
//       >
//         Mutual Friends: 89
//       </span>
//     </div>
//   );
// }
