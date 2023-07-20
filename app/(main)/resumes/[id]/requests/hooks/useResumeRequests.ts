import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"

import { IResumeRequest } from "../types/IResumeRequest"

export const useResumeRequests = (
  resumeId: number,
  query: "INCOMING" | "SENT" | "RECENT",
  options?: UseQueryOptions<IResumeRequest[]>
) => {
  return useQuery<IResumeRequest[]>(
    ["resume-requests", resumeId, query],
    () =>
      $api
        .get<IResumeRequest[]>(`/requests/resumes/${resumeId}`, {
          params: { requestType: query },
        })
        .then((res) => res.data),
    { ...options }
  )
}
