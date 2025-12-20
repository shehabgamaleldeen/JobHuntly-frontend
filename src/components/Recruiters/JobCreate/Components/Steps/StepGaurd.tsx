import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJobCreateContext } from "../../JobCreateContext";
import { isStep1Filled, isStep2Filled, isStep3Filled, isStep4Filled } from "./StepsFilledHelpers";
interface StepGuardProps {
    step: number;
    children: React.ReactNode;
}

export function StepGuard({ step, children }: StepGuardProps) {
    const navigate = useNavigate();
    const { jobData } = useJobCreateContext();

    useEffect(() => {
        switch (step) {
            case 1:
                // first step, always allowed
                break;

            case 2:
                if (!jobData.step1 || !isStep1Filled(jobData.step1)) {
                    navigate("/company/job-create/step-1");
                }
                break;

            case 3:
                if (!jobData.step2 || !isStep2Filled(jobData.step2)) {
                    navigate("/company/job-create/step-2");
                }
                break;

            case 4:
                if (!jobData.step3 || !isStep3Filled(jobData.step3)) {
                    navigate("/company/job-create/step-3");
                }
                break;

            default:
                break;
        }
    }, [step, jobData, navigate]);

    return <>{children}</>;
}
