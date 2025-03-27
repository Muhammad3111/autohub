import React from "react";
import { RiStarFill, RiStarHalfFill } from "react-icons/ri";

type StarRatingProps = {
    rating: number;
};

const Stars: React.FC<StarRatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {Array(fullStars)
                .fill(null)
                .map((_, index) => (
                    <RiStarFill
                        key={`full-${index}`}
                        className="text-yellow-400 text-xl"
                    />
                ))}

            {hasHalfStar && (
                <RiStarHalfFill className="text-yellow-400 text-xl" />
            )}

            {Array(emptyStars)
                .fill(null)
                .map((_, index) => (
                    <RiStarFill
                        key={`empty-${index}`}
                        className="text-gray-300 text-xl"
                    />
                ))}
        </div>
    );
};

export default Stars;
