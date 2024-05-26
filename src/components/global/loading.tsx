import { FC } from 'react';

const Loading: FC = () => {
    return (
        <div className="h-full w-full flex items-center justify-center animate-pulse">
            <div className="h-48 w-48 bg-red-700 rounded-lg"></div>
        </div>
    );
};

export default Loading;
