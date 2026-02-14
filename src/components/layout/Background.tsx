export default function Background() {
    return (
        <>
            {/* Gradient Background */}
            <div className="fixed inset-0 bg-gradient-to-b from-[#0a0520] via-[#150a35] to-[#1a0f3e] -z-50" />

            {/* Animated Starfield */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white animate-twinkle"
                        style={{
                            width: Math.random() * 3 + 'px',
                            height: Math.random() * 3 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 5 + 's',
                            animationDuration: Math.random() * 3 + 2 + 's',
                            opacity: Math.random() * 0.7 + 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Nebula Effects */}
            <div className="fixed inset-0 pointer-events-none -z-30">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-drift" />
                <div className="absolute bottom-40 right-32 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px] animate-drift-reverse" />
                <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[130px] animate-pulse-slow" />
            </div>
        </>
    );
}