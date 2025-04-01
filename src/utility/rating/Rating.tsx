import { Dispatch, FC, SetStateAction } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
    rating: number; // 0 dan 5 gacha bo'lgan qiymat
    setRating: Dispatch<SetStateAction<number>>; // ratingni yangilash uchun
}

const Rating: FC<RatingProps> = ({ rating, setRating }) => {
    const fullStars = Math.floor(rating); // To‘liq yulduzlar soni
    const hasHalfStar = rating % 1 !== 0; // Yarim yulduz bormi?

    // Yulduz bosilganda ratingni yangilash
    const handleStarClick = (index: number) => {
        setRating(index + 1); // index + 1 yulduzning yangi qiymatini belgilaydi
    };

    return (
        <div className="flex gap-1 text-yellow-500 text-xl cursor-pointer">
            {[...Array(5)].map((_, i) => {
                // Yulduzlarni to'liq, yarim yoki bo'sh holatda ko'rsatish
                if (i < fullStars) {
                    return (
                        <FaStar
                            key={`full-${i}`}
                            onClick={() => handleStarClick(i)} // Yulduzga bosganda o'zgartirish
                        />
                    );
                }
                if (i === fullStars && hasHalfStar) {
                    return (
                        <FaStarHalfAlt
                            key={`half-${i}`}
                            onClick={() => handleStarClick(i)} // Yulduzga bosganda o'zgartirish
                        />
                    );
                }
                return (
                    <FaRegStar
                        key={`empty-${i}`}
                        onClick={() => handleStarClick(i)} // Yulduzga bosganda o'zgartirish
                    />
                );
            })}
        </div>
    );
};

export default Rating;
