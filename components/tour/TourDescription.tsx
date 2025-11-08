"use client";
import { useState } from 'react';

const TourDescription = ({ description }: { description : string}) => {
    const [showMore, setShowMore] = useState(false);
    const limit = 200;
    return (
        <p className="text-gray-700">
            {showMore || description.length <= limit
                ? description
                : `${description.slice(0, limit)}...`}
            {description.length > limit && (
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="ml-1 text-blue-600 underline"
                >
                    {showMore ? 'Show less' : 'Read more'}
                </button>
            )}
        </p>
    )
}

export default TourDescription