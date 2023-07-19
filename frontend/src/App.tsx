import React, { useState, useEffect, ReactNode, MouseEventHandler } from 'react'
import bridge, { UserInfo } from '@vkontakte/vk-bridge'
import {
  View,
  ScreenSpinner,
  AppRoot,
  SplitLayout,
  SplitCol,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import Home from './panels/Home'
import Persik from './panels/Persik'
import { trpc } from './utils/trpc'
import { useLocation, useNavigate } from './utils/router'
import User from './panels/User'

const App = () => {
  const addComment = trpc.addComment.useMutation()
  const profileQuery = trpc.profile.useQuery()
  const utils = trpc.useContext()

  const location = useLocation()
  const navigate = useNavigate()

  const [activePanel, setActivePanel] = useState('home')
  const [fetchedUser, setUser] = useState<UserInfo | undefined>()
  console.log({
    search: window.location.search,
    hash: window.location.hash,
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'))

    const referal = params.get('r')

    if (!referal) {
      return
    }

    navigate('user', {
      userId: referal,
    })

    addComment.mutate({
      to: referal,
    }, {
      onSuccess: data => {
        utils.user.setData({id: referal}, data)
      }
    })
  }, [])

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo')
      setUser(user)
    }
    fetchData()
  }, [])

  const go: MouseEventHandler<HTMLElement> = (e) => {
    setActivePanel(e.currentTarget.dataset.to ?? 'home')
  }

  return (
    <AppRoot>
      <SplitLayout
        popout={
          (!fetchedUser || addComment.isLoading || profileQuery.isLoading) && (
            <ScreenSpinner size='large' />
          )
        }
      >
        <SplitCol>
          <View activePanel={location.page}>
            <User id='user' />
            <Home id='home' fetchedUser={fetchedUser} go={go} />
            <Persik id='persik' go={go} />
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  )
}

export default App
