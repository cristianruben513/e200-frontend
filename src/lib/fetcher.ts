import axiosInstance from "@/axiosInstance"

// fetcher.ts
export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data)
