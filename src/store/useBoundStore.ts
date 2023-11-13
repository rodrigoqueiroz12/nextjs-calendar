import { create } from 'zustand'
import { EventSliceProps, createEventSlice } from './slices/EventSlice'

export const useBoundStore = create<EventSliceProps>((...a) => ({
  ...createEventSlice(...a),
}))
