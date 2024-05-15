export default function Success() {
  return (
    <div className="tp-page bg-white">
      <div className="tp-wrapper h-[70vh] flex justify-center">
        <div className="w-72 h-fit p-6 mt-5 flex flex-col items-center bg-color-extra-secondary rounded-md">
          <i className="bi bi-check-circle-fill text-3xl text-color-primary"/>
          <div className=" mt-2 text-2xl font-semibold">
            {"Thanks for sharing!"}
          </div>
          <div className="mt-2 text-center text-color-extra-text-primary">
            {"Your review helps other travelers and that's pretty awesome. Sit tight—we'll let you know when it's up."}
          </div>
        </div>
      </div>

    </div>
  )
}