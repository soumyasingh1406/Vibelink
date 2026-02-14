
import React from 'react';
import Link from 'next/link';

interface LogoProps {
    variant?: 'horizontal' | 'compact';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'horizontal', className = '', size = 'md' }) => {
    // Size mapping for the image
    const sizeClasses = {
        sm: 'w-10 h-10',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };

    // Text size mapping
    const textSizeClasses = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-4xl',
    };

    return (
        <Link href="/" className={`group flex items-center ${variant === 'compact' ? 'flex-col gap-2' : 'gap-3'} ${className}`}>
            {/* Icon Wrapper with Glow */}
            <div className="relative relative-group">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/logos/vibelink-logo-final.svg"
                    alt="VibeLink"
                    className={`${sizeClasses[size]} object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] relative z-10 transition-transform duration-300 group-hover:scale-110`}
                />
            </div>

            {/* Text with Gradient and Future Font */}
            <div className="flex flex-col">
                <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] tracking-wide font-sans`}>
                    VibeLink
                </h1>
            </div>
        </Link>
    );
};

export default Logo;
