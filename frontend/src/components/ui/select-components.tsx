// filepath: c:\Users\User\Downloads\SchoolSHIY\DESIGN\KITCHEN KITCHEN\Kitchen\src\components\ui\select-components.tsx
import * as React from "react";

export const Select: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="select">{children}</div>;
};

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="select-content">{children}</div>;
};

export const SelectItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="select-item">{children}</div>;
};

export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <button className="select-trigger">{children}</button>;
};

export const SelectValue: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="select-value">{children}</div>;
};