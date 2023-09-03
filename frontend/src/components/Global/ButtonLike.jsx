import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function ButtonLike({ initialLiked, onLikeToggle, sizeIcon = 20 }) {
  const [liked, setLiked] = useState(initialLiked);

  const handleLikeToggle = () => {
    setLiked(!liked);
    onLikeToggle();
  };

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  return (
    <Icon
      icon="subway:like"
      color={`${liked ? "#2956f6" : "gray"}`}
      onClick={handleLikeToggle}
      width={sizeIcon}
      className="cursor-pointer transition-all duration-300 hover:scale-95 hover:fill-red-600"
    />
  );
}
