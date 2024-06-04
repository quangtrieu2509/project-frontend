export const bookingStates = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const getStateLabel: Record<string, any> = {
  "pending": <div>Pending</div>,
  "confirmed": <div>Confirmed</div>,
  "completed": <div>Completed</div>,
  "cancelled": <div>Cancelled</div>
}

export const bookingStateLabels = [
  {
    key: "pending",
    label: "Pending"
  },
  {
    key: "confirmed",
    label: "Confirmed"
  },
  {
    key: "completed",
    label: "Completed"
  },
  {
    key: "cancelled",
    label: "Cancelled"
  }
]