import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-caption text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-caption text-primary font-medium">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="mt-3 text-center">
          <h3 className="font-heading font-medium text-foreground">
            {steps[currentStep - 1]?.title}
          </h3>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    border-2 transition-all duration-200
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isActive
                        ? 'bg-primary/10 border-primary text-primary' :'bg-muted border-border text-muted-foreground'
                    }
                  `}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-caption font-medium">
                        {stepNumber}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-center">
                    <p className={`
                      text-sm font-caption font-medium
                      ${isActive ? 'text-primary' : 'text-muted-foreground'}
                    `}>
                      {step.title}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 transition-all duration-200
                    ${isCompleted ? 'bg-primary' : 'bg-border'}
                  `} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;