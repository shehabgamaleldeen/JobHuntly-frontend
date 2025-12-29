import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useJobCreateContext } from "../../JobCreateContext";
import { isStep1Filled, isStep2Filled, isStep3Filled } from "./StepsFilledHelpers";

interface StepGuardProps {
    step: number;
    children: React.ReactNode;
}

export function StepGuard({ children }: StepGuardProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { jobData } = useJobCreateContext();

    useEffect(() => {
        // 1. Wait for hydration (optional, but good practice if data loads async)
        // Since we load synchronously from localStorage in useState, this is instant.

        const checkAccess = () => {
            const s1 = isStep1Filled(jobData.step1);
            const s2 = isStep2Filled(jobData.step2);
            const s3 = isStep3Filled(jobData.step3);

            // LOGIC: Find the first incomplete step
            // This determines where the user SHOULD be.
            let correctPath = "/company/job-create/step-1";
            
            if (s1) {
                correctPath = "/company/job-create/step-2"; // Step 1 is done, they are allowed on 2
                if (s2) {
                    correctPath = "/company/job-create/step-3"; // Step 2 is done, allowed on 3
                    if (s3) {
                        correctPath = "/company/job-create/step-4"; // Step 3 is done, allowed on 4
                    }
                }
            }

            const currentPath = location.pathname;

            // 2. Allow backward navigation (Viewing previous steps)
            // If I am allowed on Step 3, I am definitely allowed on Step 1 and 2.
            // We only redirect if the user is trying to go AHEAD of their progress.
            
            // Map paths to "Levels" to compare easily
            const getLevel = (path: string) => {
                if (path.includes("step-1")) return 1;
                if (path.includes("step-2")) return 2;
                if (path.includes("step-3")) return 3;
                if (path.includes("step-4")) return 4;
                return 0;
            };

            const currentLevel = getLevel(currentPath);
            const maxAllowedLevel = getLevel(correctPath);

            // If user is trying to access Step 4, but Max Allowed is Step 2 -> Redirect to Step 2
            if (currentLevel > maxAllowedLevel) {
                console.log(`🚫 Creating Job Guard: You are on Step ${currentLevel} but only allowed up to Step ${maxAllowedLevel}. Redirecting to ${correctPath}`);
                navigate(correctPath, { replace: true });
            }
        };

        checkAccess();

    }, [jobData, location.pathname, navigate]);

    return <>{children}</>;
}