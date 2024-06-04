import { useLocation } from "react-router-dom"

// interface SuccessProps {
//   action?: string
//   statement?: string
// }

export default function Success() {
  const state = useLocation().state

  return (
    <div className="tp-page bg-white">
      <div className="tp-wrapper h-[70vh] flex justify-center">
        <div className="w-72 h-fit p-6 mt-5 flex flex-col items-center bg-color-extra-secondary rounded-md">
          <i className="bi bi-check-circle-fill text-3xl text-color-primary"/>
          <div className=" mt-2 text-2xl font-semibold">
            {`Thanks for ${state?.action ?? "submitting"}!`}
          </div>
          <div className="mt-2 text-center text-color-extra-text-primary">
            {`${state?.statement ? state.statement + ". " : ""}Sit tight—we'll let you know when it's up.`}
          </div>
        </div>
      </div>

    </div>
  )
}