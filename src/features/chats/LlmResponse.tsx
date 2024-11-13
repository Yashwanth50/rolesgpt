import { useOutletContext } from "react-router-dom";
import { CATEGORY_RESPONSE } from "../../components/common/Constants";

interface StepperProps {
  activeStep: number;
  steps: string[];
}

function Stepper({ activeStep, steps }: StepperProps) {
  return (
    <div className="w-full max-w-md">
      {steps.map((step, index) => (
        <div key={step} className="relative flex items-start pl-10">
          {/* Vertical Line */}
          {/* {index < steps.length - 1 && (
            <div
              className="absolute left-4 top-4 w-px h-full bg-gray-300"
              style={{ height: "calc(100% + 12px)" }}
            ></div>
          )} */}

          <div className="flex items-center space-x-3">
            <div className="relative z-10 flex items-center justify-center w-6 h-6">
              {index < activeStep ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">&#10003;</span>
                </div>
              ) : index === activeStep ? (
                <div className="w-5 h-5 border-4 border-t-transparent border-text_primary rounded-full animate-spin"></div>
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              )}
            </div>
            <div
              className={`text-lg font-semibold ${
                index === activeStep ? "text-text_primary" : "text-gray-600"
              }`}
            >
              {step}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Categories() {
  return (
    <div className="divide-y">
      {CATEGORY_RESPONSE.map((category, index) => (
        <div
          key={index}
          className="flex items-center w-full h-7 mt-3 justify-between"
        >
          <div className="w-full font-medium leading-7">
            Category {category.category} : {category.title}
          </div>
          <button className="w-6 h-6">
            <img src="/icons/dropdown.svg" alt="dropdown" />
          </button>
        </div>
      ))}
    </div>
  );
}

interface OutletContext {
  activeStep: number;
  startStepper: boolean;
}

export default function LlmResponse() {
  const { activeStep, startStepper } = useOutletContext<OutletContext>();

  const steps = [
    "Process Batch 1",
    "Process Batch 2",
    "Process Batch 3",
    "Process Batch 4",
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <img src="/icons/logo.svg" alt="logo" className="h-6 w-6" />
        <span className="font-medium leading-5 text-[#323232]">Response</span>
      </div>
      {startStepper && (
        <p className="text-text_primary">Response Time: 1-2 Mins</p>
      )}
      {startStepper ? (
        <Stepper activeStep={activeStep} steps={steps} />
      ) : (
        <>
          <div className="text-[#323232]">
            <h3 className="font-bold text-lg leading-8">
              Strategic Guidance for High School Achievers
            </h3>
            <div className="text-sm font-light leading-7">
              Transitioning from high school to college requires careful
              planning, especially for students with strong academic and
              extracurricular backgrounds. This guide offers strategies for
              college selection, research opportunities, time management, and
              showcasing leadership, helping students align their goals with the
              right programs to ensure a successful college journey.
            </div>
          </div>
          <Categories />
        </>
      )}
    </div>
  );
}
