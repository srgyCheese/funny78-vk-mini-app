import { create } from "zustand"

type RouterStore = {
  page: string
  setPage: (page: string) => void
  data: any
  setData: (data: any) => void
}

const useRouterStore = create<RouterStore>()((set) => ({
  page: "user",
  setPage: (page) => set((state) => ({ page })),
  data: null,
  setData: (data) => set((state) => ({ data })),
}))

export const useNavigate = () => {
  const setPage = useRouterStore((state) => state.setPage)
  const setData = useRouterStore((state) => state.setData)

  return (page: string, data?: any) => {
    setPage(page)

    if (data !== undefined) {
      setData(data)
    }
  }
}

export const useLocation = () => {
  const page = useRouterStore((state) => state.page)
  const data = useRouterStore((state) => state.data)

  return {
    page,
    data,
  }
}
