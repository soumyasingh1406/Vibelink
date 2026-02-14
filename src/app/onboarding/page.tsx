import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen py-12 px-4 flex items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-black -z-10">
                <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[60%] bg-neon-pink/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            <OnboardingForm />
        </div>
    );
}
