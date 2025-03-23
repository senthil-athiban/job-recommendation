import React from 'react';
import { FileIcon, FileTextIcon, ThumbsUpIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Resume } from '@/types/api';

interface ResumeHistoryProps {
  setActiveTab: (tab: string) => void;
  resumes: Array<Resume>;
}

const ResumeHistory = ({ setActiveTab, resumes }: ResumeHistoryProps) => {
  if (!resumes || resumes.length === 0) {
    return null;
  }

  
  const formatFilename = (filename: string) => {
    if (filename.includes('_')) {
      const parts = filename.split('_');
      parts.shift();
      return parts.join('_');
    }
    return filename;
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Your Resumes</CardTitle>
        <CardDescription>Previously uploaded resumes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {resumes.map((resume) => (
            <div 
              key={resume._id} 
              className="p-3 border rounded-md flex justify-between items-center hover:bg-slate-50"
            >
              <div className="flex items-center">
                {resume.fileType.toLowerCase() === 'pdf' ? (
                  <FileIcon className="text-red-500 mr-2 h-5 w-5" />
                ) : (
                  <FileTextIcon className="text-blue-500 mr-2 h-5 w-5" />
                )}
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {formatFilename(resume.filename)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(resume.createdAt).toLocaleDateString()} 
                    {resume.extractedSkills && (
                      <span> • {resume.extractedSkills.length} skills found</span>
                    )}
                  </p>
                </div>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => {
                    setActiveTab("recommendedJobs");
                  }}
                >
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                  <span>View Matches</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeHistory;