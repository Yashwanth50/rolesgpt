// Prompt.tsx
import React from "react";

interface PromptProps {
  prompt: string;
  index: number;
}

const Prompt: React.FC<PromptProps> = ({ prompt }) => {
  return (
    <div className="mt-4">
      <p>{prompt}</p>
    </div>
  );
};

export default Prompt;
