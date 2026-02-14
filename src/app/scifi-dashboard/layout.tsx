import { Orbitron, Rajdhani, Courier_Prime } from "next/font/google";
import clsx from "clsx";

const orbitron = Orbitron({
    subsets: ["latin"],
    variable: "--font-orbitron",
    display: "swap",
});

const rajdhani = Rajdhani({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-rajdhani",
    display: "swap",
});

const courierPrime = Courier_Prime({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-courier",
    display: "swap",
});

export default function SciFiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={clsx(
            orbitron.variable,
            rajdhani.variable,
            courierPrime.variable,
            "bg-black min-h-screen text-white font-rajdhani overflow-hidden"
        )}>
            {children}
        </div>
    );
}
