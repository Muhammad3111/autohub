import { FC } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number; // 0 dan 5 gacha bo'lgan qiymat
}

const Rating: FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating); // To‘liq yulduzlar soni
  const hasHalfStar = rating % 1 !== 0; // Yarim yulduz bormi?
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Bo‘sh yulduzlar

  return (
    <div className="flex gap-1 text-primary text-xl">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt key="half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};

export default Rating;
