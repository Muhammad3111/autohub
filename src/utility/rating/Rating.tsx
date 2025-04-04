import { Dispatch, FC, SetStateAction } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number; // 0 dan 5 gacha bo'lgan qiymat
  setRating?: Dispatch<SetStateAction<number>>; // optional qildik
}

const Rating: FC<RatingProps> = ({ rating, setRating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleStarClick = (index: number) => {
    if (typeof setRating === "function") {
      setRating(index + 1);
    }
  };

  return (
    <div
      className={`flex gap-1 text-yellow-500 text-xl ${
        setRating ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <FaStar key={`full-${i}`} onClick={() => handleStarClick(i)} />
          );
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <FaStarHalfAlt
              key={`half-${i}`}
              onClick={() => handleStarClick(i)}
            />
          );
        }
        return (
          <FaRegStar key={`empty-${i}`} onClick={() => handleStarClick(i)} />
        );
      })}
    </div>
  );
};

export default Rating;
