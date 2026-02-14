import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    glowColor?: "purple" | "cyan" | "pink";
}

export function NeonButton({
    children,
    variant = "primary",
    glowColor = "cyan",
    className,
    ...props
}: NeonButtonProps) {
    // Holo Button Styles
    const baseStyles =
        "relative px-8 py-4 font-bold uppercase tracking-[0.2em] transition-all duration-300 group flex items-center justify-center overflow-hidden holo-shape";

    const colorMap = {
        purple: { text: "text-holo-purple", border: "border-holo-purple", bg: "bg-holo-purple", shadow: "shadow-holo-purple" },
        cyan: { text: "text-holo-blue", border: "border-holo-blue", bg: "bg-holo-blue", shadow: "shadow-holo-blue" },
        pink: { text: "text-holo-pink", border: "border-holo-pink", bg: "bg-holo-pink", shadow: "shadow-holo-pink" },
    };

    const colors = colorMap[glowColor] || colorMap.cyan;

    const buttonVariants = {
        primary: `bg-opacity-20 backdrop-blur-md border border-white/10 hover:bg-opacity-40 text-white ${colors.bg}`,
        secondary: "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white",
        outline: `bg-transparent border ${colors.border} ${colors.text} hover:bg-white/5`,
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, buttonVariants[variant], className)}
            {...props}
        >
            {/* Background Glow for Primary */}
            {variant === 'primary' && (
                <div className={`absolute inset-0 opacity-20 ${colors.bg} blur-md`} />
            )}

            {/* Tech Squares decoration */}
            <span className={`absolute top-0 right-0 w-2 h-2 ${colors.bg}`} />
            <span className={`absolute bottom-0 left-0 w-2 h-2 ${colors.bg}`} />

            <span className="relative z-10 flex items-center gap-3">
                {children}
            </span>

            {/* Scan wipe effect */}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
        </motion.button>
    );
}
