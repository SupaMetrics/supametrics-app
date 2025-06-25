"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <CardTitle className="text-xl md:text-2xl">
            {titleMap[type]}
          </CardTitle>
          <CardDescription className="text-base">
            {descriptionMap[type]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "team" && (
              <div className="space-y-1">
                <Label
                  className="mb-2 mt-3.5 text-base font-mediu"
                  htmlFor="name"
                >
                  Team Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Marketing Squad"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            {type === "project" && (
              <>
                <div className="space-y-1">
                  <Label className="mb-2 mt-3.5">Team</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {formData.team || "Select Team"}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {mockTeams.map((team) => (
                        <DropdownMenuItem
                          key={team}
                          onSelect={() =>
                            setFormData((prev) => ({ ...prev, team }))
                          }
                          className="w-full cursor-pointer"
                        >
                          {team}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1">
                  <Label className="mb-2 mt-3.5" htmlFor="name">
                    Project Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. StarGPT"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="mb-2 mt-3.5" htmlFor="url">
                    Project URL
                  </Label>
                  <Input
                    id="url"
                    name="url"
                    placeholder="https://project-site.com"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="mb-2 mt-3.5">Type</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {formData.projectType}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem
                        onSelect={() =>
                          setFormData((prev) => ({
                            ...prev,
                            projectType: "Web",
                          }))
                        }
                        className="w-full cursor-pointer"
                      >
                        Web
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}

            {type === "link" && (
              <div className="space-y-1">
                <Label className="mb-2 mt-3.5" htmlFor="url">
                  Link
                </Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://your-link.com"
                  value={formData.url}
                  onChange={handleChange}
                />
              </div>
            )}

            <Button type="submit" className="w-full mt-5">
              {type === "project" ? "Complete" : `Submit ${type}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
