import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the course progress-related API endpoints
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/";
export const COURSE_PROGRESS_API = `${BACKEND_URL}api/v1/progress/`;

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
      }),
    }),

    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),
    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteCourseMutation,
  useInCompleteCourseMutation,
} = courseProgressApi;
