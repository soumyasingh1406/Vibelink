import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    purple: '#8b5cf6',
                    pink: '#ec4899',
                    blue: '#3b82f6',
                    cyan: '#06b6d4',
                    teal: '#14b8a6',
                },
                glass: {
                    light: 'rgba(255, 255, 255, 0.05)',
                    medium: 'rgba(255, 255, 255, 0.08)',
                    strong: 'rgba(255, 255, 255, 0.12)',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'space-gradient': 'linear-gradient(to bottom, #0a0520, #150a35, #1a0f3e)',
                'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            },
            backdropBlur: {
                xs: '2px',
                '3xl': '64px',
            },
            animation: {
                twinkle: 'twinkle infinite',
                drift: 'drift 20s infinite ease-in-out',
                'drift-reverse': 'drift-reverse 25s infinite ease-in-out',
                'pulse-slow': 'pulse-slow 8s infinite ease-in-out',
                float: 'float 6s infinite ease-in-out',
                shine: 'shine 8s infinite',
                'border-glow': 'borderGlow 8s ease infinite',
                'gradient-shift': 'gradientShift 3s linear infinite',
                ripple: 'ripple 0.6s ease-out',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '1' },
                },
                drift: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(30px, 30px)' },
                },
                'drift-reverse': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(-30px, -30px)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '0.1' },
                    '50%': { opacity: '0.2' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shine: {
                    '0%': { left: '-100%' },
                    '20%, 100%': { left: '100%' },
                },
                borderGlow: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                gradientShift: {
                    '0%': { backgroundPosition: '0% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '1' },
                    '100%': { transform: 'scale(4)', opacity: '0' },
                },
            },
            boxShadow: {
                'glow-purple': '0 0 20px rgba(138, 43, 226, 0.5)',
                'glow-purple-lg': '0 0 40px rgba(138, 43, 226, 0.6)',
                'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
                'glow-pink-lg': '0 0 40px rgba(236, 72, 153, 0.6)',
                'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
                'glow-blue-lg': '0 0 40px rgba(59, 130, 246, 0.6)',
                'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
                glass: '0 8px 32px rgba(0, 0, 0, 0.5)',
                'glass-lg': '0 12px 48px rgba(0, 0, 0, 0.6)',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};

export default config;