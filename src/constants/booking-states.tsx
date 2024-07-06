export const bookingStates = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

const cf = "text-sm font-semibold px-2 py-0.5 ml-4 rounded-md "
export const getStateLabel: Record<string, any> = {
  "pending": <div className={cf + "bg-neutral-200 text-neutral-700"}>Pending</div>,
  "confirmed": <div className={cf + "bg-blue-200 text-blue-700"}>Confirmed</div>,
  "completed": <div className={cf + "bg-green-100 text-green-700"}>Completed</div>,
  "cancelled": <div className={cf + "bg-red-200 text-red-700"}>Cancelled</div>
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