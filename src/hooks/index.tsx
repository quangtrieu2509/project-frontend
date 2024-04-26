import { useEffect } from "react"

const useDocumentTitle = (title?: string): void => {
  useEffect(() => {
    document.title = title || "Trippie"
  }, [title])
}

export default useDocumentTitle
