import React, { useState, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Tooltip } from "react-tooltip";
import { addToast } from "../lib/useToastContext";

interface LlmResponseFormatProps {
  generatedText: string;
}

const LlmResponseFormat: React.FC<LlmResponseFormatProps> = ({
  generatedText,
}) => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      addToast("Success", "Copied successfully");
    });
  };

  return (
    <div className="text-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({
            inline = false,
            className,
            children = null,
            ...props
          }: {
            inline?: boolean;
            className?: string;
            children?: ReactNode;
          }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeContent = String(children).replace(/\n$/, "");

            return !inline && match ? (
              <div
                className="relative text-gray-200 rounded-md overflow-auto max-w-full"
                style={{
                  borderTop: "3px solid #333",
                  backgroundColor: "#2d2d2d",
                }}
              >
                <SyntaxHighlighter
                  language={match[1]}
                  style={atomDark}
                  PreTag="div"
                  {...props}
                  className="p-4 pr-12 code-scroll"
                >
                  {codeContent}
                </SyntaxHighlighter>
                <button
                  onClick={() => handleCopyCode(codeContent)}
                  id="code-copy"
                  className="absolute top-2 right-2 bg-white text-black p-1 rounded shadow-md hover:bg-gray-100 transition duration-200"
                  style={{
                    marginRight: "8px",
                    padding: "4px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <img
                    src={"/icons/response-copy.svg"}
                    alt="Copy Icon"
                    className="w-5 h-5"
                  />
                </button>
                <Tooltip id="code-copy" anchorSelect="#code-copy" place="top">
                  <span className="text-xs">Copy code</span>
                </Tooltip>
              </div>
            ) : (
              <code
                className="bg-gray-800 text-gray-200 rounded-md p-1"
                {...props}
              >
                {children}
              </code>
            );
          },
          details({ node, ...props }) {
            const index = node?.position?.start.line || 0;
            const isOpen = openSections[index] || false;
            return (
              <details
                open={isOpen}
                onClick={() => toggleSection(index)}
                className="markdown-details"
              >
                {props.children}
              </details>
            );
          },
          summary({ node, children, ...props }) {
            const index = node?.position?.start.line || 0;
            const isOpen = openSections[index] || false;
            return (
              <summary
                className="markdown-summary"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSection(index);
                }}
              >
                <span>{children}</span>
                <img
                  src={"/icons/chevron-down.svg"}
                  alt="Toggle Icon"
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </summary>
            );
          },
        }}
      >
        {generatedText}
      </ReactMarkdown>
    </div>
  );
};

export default LlmResponseFormat;
