"use client";

import { GraduationCap } from "lucide-react";
import { universities } from "@/lib/constants";

// Filter out the empty option and "other"
const availableUniversities = universities.filter(
  (uni) => uni.value !== "" && uni.value !== "other"
);

// Mock data for student counts (in a real app, this would come from an API)
const getStudentCount = (index: number) => {
  const counts = [342, 287, 156, 189, 231, 145, 198, 167, 223];
  return counts[index % counts.length];
};

export default function Universities() {
  return (
    <div className="w-full px-16  bg-[#F8F9FA] dark:bg-[#F8F9FA] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold text-primary-dark mb-12 text-center">
          Περιήγηση ανά Πανεπιστήμιο
        </h2>
        
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max px-2">
            {availableUniversities.map((university, index) => {
              const studentCount = getStudentCount(index);
              
              return (
                <div
                  key={university.value}
                  className="flex-shrink-0 w-56 bg-white rounded-xl p-6 transition-colors cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Circular Icon */}
                    <div
                      className="bg-primary-dark rounded-full p-4 mb-4 flex items-center justify-center w-16 h-16"
                    >
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* University Name */}
                    <h3 className="text-lg font-bold text-primary-dark mb-2 line-clamp-2 min-h-[3.5rem]">
                      {university.label}
                    </h3>
                    
                    {/* Student Count */}
                    <p className="text-sm text-secondary-typography">
                      {studentCount} students
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
