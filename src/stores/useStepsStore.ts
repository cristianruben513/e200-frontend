import { create } from "zustand"

type StepsStore = {
  status: number,
  errorMessage: string | null,
  setStatus: (status: number, errorMessage?: string | null) => void
}

export const APP_STATUS = {
  UPLOAD: 1,
  LOADING: 2,
  SUCCESS: 3,
  ERROR: -1
}

export const useStepsStore = create<StepsStore>((set) => ({
  status: APP_STATUS.UPLOAD,
  errorMessage: null,
  setStatus: (status: number, errorMessage: string | null = null) => set({ status, errorMessage }),
}))

export function setAppStatusUpload() {
  useStepsStore.getState().setStatus(APP_STATUS.UPLOAD)
}

export function setAppStatusLoading() {
  useStepsStore.getState().setStatus(APP_STATUS.LOADING)
}

export function setAppStatusError(message: string) {
  useStepsStore.getState().setStatus(APP_STATUS.ERROR, message)
}

export function setAppStatusSuccess() {
  useStepsStore.getState().setStatus(APP_STATUS.SUCCESS)
}
