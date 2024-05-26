"use client"

import { Suspense, useEffect, useState } from "react";
import Loading from "./global/loading";

export default function RandomImage() {
    const images = ['/1.webp', '/2.jpg', '/3.webp', '/5.webp', '/6.webp'];

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return '/img/' + images[randomIndex];
    };

    const [selectedImage, setSelectedImage] = useState<string>('');

    useEffect(() => {
        setSelectedImage(getRandomImage());
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            {selectedImage && (
                <>
                    <div className="absolute top-0 bg-black/10 h-full w-full"></div>
                    <img
                        src={selectedImage}
                        alt="Random Image"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </>
            )}
        </Suspense>
    )
}