type Step = {
  title: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number; 
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className='steps-indicator'>
      {steps.map((step, index) => {
        const stepIndex = index + 1;
        const isCompleted = stepIndex < currentStep;
        const isActive = stepIndex === currentStep;

        return (
          <div
            key={index}
            className={`step-item ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
          >
            <div className='step-circle'>
              {isCompleted ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
              ) : (
                stepIndex
              )}
            </div>
            <div className='step-title'>{step.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
