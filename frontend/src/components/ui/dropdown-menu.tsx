import React from "react";

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative">{children}</div>
);

export const DropdownMenuTrigger: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button type="button" {...props}>{children}</button>
);

export const DropdownMenuContent: React.FC<{ children: React.ReactNode; className?: string; align?: string }> = ({ children, className }) => (
  <div className={`absolute right-0 mt-2 bg-white border rounded shadow-lg z-50 ${className || ""}`}>
    {children}
  </div>
);

export const DropdownMenuItem: React.FC<React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }> = ({ children, asChild, ...props }) => {
  if (asChild) {
    return <div {...props}>{children}</div>;
  }
  return (
    <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" {...props}>
      {children}
    </div>
  );
};