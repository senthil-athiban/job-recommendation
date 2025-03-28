"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CloudUploadIcon, BriefcaseIcon, ThumbsUpIcon, ExternalLinkIcon, MapPinIcon, CurrencyIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { jobApi, resumeApi, userApi } from '@/lib/api';

import { useAuth } from '@/hooks/useAuth';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ResumeHistory from './resume.component';

import { Job, MatchedJob, Resume } from '@/types/api';

const JobsTab = () => {

  const { logout } = useAuth();
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("allJobs");
  const [allJobs, setAllJobs] = useState<Array<Job>>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<Array<MatchedJob>>([]);
  const [hasResume, setHasResume] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(true);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resumes, setResumes] = useState<Array<Resume>>([]);

  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const handleResumeUpload = async (e:any) => {
    e.preventDefault();
    
    if (!resumeFile) {
      setUploadError("Please select a file");
      return;
    }
    
    // Check file type
    if (
      resumeFile.type !== "application/pdf" && 
      resumeFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      toast.error("Only PDF and DOCX files are allowed");
      return;
    }
    
    try {
      setUploadingResume(true);
      setUploadError("");
      
      const formData = new FormData();
      formData.append("resume", resumeFile);
      
      await resumeApi.upload(formData);
      
      setUploadSuccess(true);
      setResumeFile(null);
      setHasResume(true);
      
      // Switch to recommended tab after upload
      setTimeout(() => {
        setActiveTab("recommendedJobs");
        setUploadSuccess(false);
      }, 1500);
    } catch (error:any) {
      console.error("Error uploading resume:", error);
      setUploadError(error.response?.data?.message || "Failed to upload resume");
    } finally {
      setUploadingResume(false);
    }
  };

  const fetchRecommendedJobs = useCallback(async () => {
    if(!(activeTab === "recommendedJobs")) return;
    try {
      setIsLoadingRecommended(true);
      const response = await jobApi.getMatchedJobs();
      if (response.data && response.data.jobs) {
        setRecommendedJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching recommended jobs:", error);
    } finally {
      setIsLoadingRecommended(false);
    }
  },[activeTab]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        setIsLoadingJobs(true);
        const response = await jobApi.getAllJobs();
        if (response.data && response.data) {
          setAllJobs(response.data.jobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoadingJobs(false);
      }
    };

    fetchAllJobs();
  }, []);

  useEffect(() => {
    const checkResume = async () => {
      try {
        const response = await resumeApi.getAllResumes();
        if (response.data) {
            setResumes(response.data);
          setHasResume(true);
          fetchRecommendedJobs();
        }
      } catch (error) {
        console.error("Error checking resumes:", error);
        setHasResume(false);
      }
    };

    checkResume();
  }, [uploadSuccess, activeTab, fetchRecommendedJobs]);

  const fetchUserProfile = async () => {
    if (activeTab !== "profile") return;
    
    try {
      setIsLoadingProfile(true);
      const response = await userApi.getProfile();
      if (response.data) {
        setUserProfile(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to load profile information");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Add this new useEffect to fetch profile data when tab changes
  useEffect(() => {
    if (activeTab === "profile") {
      fetchUserProfile();
    }
  }, [activeTab]);

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const JobCard = ({ job, isRecommended = false }:any) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="text-base font-medium">{job.company}</CardDescription>
          </div>
          {isRecommended && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-700">
              {Math.round(job.match_score)}% Match
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex mb-3 items-center text-gray-500">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">{job.location} {job.is_remote && "(Remote)"}</span>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <CurrencyIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {job.salary_min} - {job.salary_max} {job.currency}
          </span>
        </div>
        <div className="my-3">
          <p className="line-clamp-3 text-sm text-gray-600">{job.description}</p>
        </div>
        {isRecommended && job.matchedSkills && job.matchedSkills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {job.matchedSkills.map((skill:string, i:number) => (
              <Badge key={i} variant="outline" className="bg-blue-50">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <a 
          href={job.job_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-blue-600 flex items-center"
        >
          <ExternalLinkIcon className="h-3 w-3 mr-1" /> View Job
        </a>
      </CardFooter>
    </Card>
  );
 
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="allJobs" className="flex items-center">
            <BriefcaseIcon className="h-4 w-4 mr-2" /> All Jobs
          </TabsTrigger>
          <TabsTrigger 
            value="recommendedJobs" 
            disabled={!hasResume}
            className="flex items-center"
            title={!hasResume ? "Upload your resume first" : ""}
          >
            <ThumbsUpIcon className="h-4 w-4 mr-2" /> Recommended Jobs
          </TabsTrigger>
          <TabsTrigger value="uploadResume" className="flex items-center">
            <CloudUploadIcon className="h-4 w-4 mr-2" /> Upload Resume
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="allJobs">
          <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
          {isLoadingJobs ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-20 w-full mt-3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              {allJobs.length === 0 ? (
                <Alert>
                  <AlertTitle>No jobs available</AlertTitle>
                  <AlertDescription>
                    There are currently no job listings available.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allJobs.map((job:Job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendedJobs">
          <h2 className="text-2xl font-bold mb-6">Jobs Matched To Your Profile</h2>
          {!hasResume ? (
            <Alert>
              <AlertTitle>Resume Required</AlertTitle>
              <AlertDescription>
                Please upload your resume to get job recommendations.
                <Button 
                  variant="link" 
                  className="p-0 ml-2" 
                  onClick={() => setActiveTab("uploadResume")}
                >
                  Upload Resume
                </Button>
              </AlertDescription>
            </Alert>
          ) : isLoadingRecommended ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-20 w-full mt-3" />
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-16" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              {recommendedJobs.length === 0 ? (
                <Alert>
                  <AlertTitle>No matching jobs found</AlertTitle>
                  <AlertDescription>
                    We couldn{" ' "}t find any jobs matching your profile. Try uploading a different resume or check back later.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {recommendedJobs.map((job:Job) => (
                    <JobCard key={job._id} job={job} isRecommended={true} />
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="uploadResume">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>
                  Upload your resume to get personalized job recommendations. We accept PDF and DOCX files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResumeUpload}>
                  <div className="grid w-full gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume</Label>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        disabled={uploadingResume}
                      />
                      <p className="text-xs text-gray-500">
                        Only PDF and DOCX files are supported.
                      </p>
                    </div>
                    
                    {uploadError && (
                      <Alert variant="destructive">
                        <AlertDescription>{uploadError}. Please, try again.</AlertDescription>
                      </Alert>
                    )}
                    
                    {uploadSuccess && (
                      <Alert className="bg-green-50 text-green-800 border-green-200">
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                          Your resume has been uploaded successfully. Redirecting to recommendations...
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <Button 
                      type="submit" 
                      disabled={uploadingResume || !resumeFile || uploadSuccess}
                      className="w-full"
                    >
                      {uploadingResume ? "Uploading..." : "Upload Resume"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <ResumeHistory resumes={resumes} setActiveTab={setActiveTab}  />
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
            
            {isLoadingProfile ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src="" alt={userProfile?.email} />
                      <AvatarFallback className="bg-primary text-white text-lg">
                        {userProfile?.email?.[0].toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{userProfile?.fullName || "User"}</CardTitle>
                      <CardDescription>{userProfile?.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Account Information</h3>
                      <Separator className="my-2" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">User ID</Label>
                          <p className="text-sm font-medium">{userProfile?._id}</p>
                        </div>
                        <div>
                          <Label className="text-xs">Joined</Label>
                          <p className="text-sm font-medium">
                            {userProfile?.createdAt 
                              ? new Date(userProfile.createdAt).toLocaleDateString() 
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Resume Information</h3>
                      <Separator className="my-2" />
                      <div>
                        <Label className="text-xs">Uploaded Resumes</Label>
                        <p className="text-sm font-medium">{resumes.length || 0}</p>
                        {resumes?.length > 0 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => setActiveTab("uploadResume")}
                          >
                            <CloudUploadIcon className="h-3 w-3 mr-1" /> Manage Resumes
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        variant="destructive" 
                        className="w-full sm:w-auto"
                        onClick={handleLogout}
                      >
                        <LogOutIcon className="h-4 w-4 mr-2" /> Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobsTab;