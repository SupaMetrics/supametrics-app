"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormProps {
  type: "team" | "project" | "link";
  className?: string;
  onSubmit?: (data: any) => void;
}

const mockTeams = ["Team Alpha", "Team Beta", "Team Gamma"];

export const Form: React.FC<FormProps> = ({
  type,
  onSubmit,
  className,
  ...props
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    team: "",
    projectType: "Web",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let result;
    switch (type) {
      case "team":
        result = { teamName: formData.name };
        break;
      case "project":
        result = {
          projectName: formData.name,
          team: formData.team,
          url: formData.url,
          type: formData.projectType,
        };
        break;
      case "link":
        result = { linkUrl: formData.url };
        break;
    }
    onSubmit?.(result);
    console.log("Submitted:", result);
  };

  const titleMap = {
    team: "Create a Team",
    project: "New Project",
    link: "Attach a Link",
  };

  const descriptionMap = {
    team: "Start by giving your team a name.",
    project: "Define your project with team, type, and URL.",
    link: "Paste a link you'd like to add.",
  };

  const renderInput = (
    name: keyof typeof formData,
    label: string,
    placeholder: string
  ) => (
    <div className="space-y-1">
      <Label htmlFor={name} className="mb-2 mt-3.5 text-base md:text-lg">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className="h-12 text-base"
      />
    </div>
  );

  const renderSelect = (
    name: "team" | "projectType",
    label: string,
    options: string[]
  ) => (
    <div className="space-y-1">
      <Label className="mb-2 mt-3.5 text-base md:text-lg">{label}</Label>
      <Select
        value={formData[name]}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, [name]: value }))
        }
      >
        <SelectTrigger className="h-12 text-base">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const fieldConfig: Record<string, React.ReactNode[]> = {
    team: [renderInput("name", "Team Name", "e.g. Marketing Squad")],
    project: [
      renderSelect("team", "Team", mockTeams),
      renderInput("name", "Project Name", "e.g. StarGPT"),
      renderInput("url", "Project URL", "https://project-site.com"),
      renderSelect("projectType", "Type", ["Web"]),
    ],
    link: [renderInput("url", "Link", "https://your-link.com")],
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 md:py-10",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-lg md:max-w-2xl shadow-md border md:rounded-xl py-6 md:px-5 md:py-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">
            {titleMap[type]}
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            {descriptionMap[type]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fieldConfig[type]}
            <Button type="submit" className="w-full mt-6 h-12 text-base">
              {type === "project" ? "Complete" : `Submit ${type}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
