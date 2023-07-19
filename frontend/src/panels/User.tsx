import React, { MouseEventHandler, useMemo } from 'react'
import { Panel, PanelHeader, Header, Button, Group, Div } from '@vkontakte/vkui'
import { useLocation } from '../utils/router'
import { trpc } from '../utils/trpc'
import './User.css'
import bridge from '@vkontakte/vk-bridge'

const User = ({ id }: { id: string }) => {
  const userId = useMemo(
    () => new URLSearchParams(window.location.search).get('vk_user_id'),
    [window.location.search]
  )
  const location = useLocation()

  const userQuery = trpc.user.useQuery({
    id: location.data?.userId || userId,
  })

  if (userQuery.isLoading) {
    return <Panel id={id}></Panel>
  }

  return (
    <Panel id={id}>
      <PanelHeader>Самый адекватный пользователь</PanelHeader>
      {userQuery.data?.photo_400 ? (
        <img src={userQuery.data.photo_400} />
      ) : (
        'Поставь фото, дурашка'
      )}

      <div>
        {userQuery.data.comments.map(({ commentTemplate, fromUser, id }) => (
          <div className='comment' key={id}>
            <img src={commentTemplate.url} className='comment-background' />
            {fromUser.photo_400 ? (
              <img
                className='comment__avatar'
                src={fromUser.photo_400}
                style={{
                  transform: commentTemplate.avatarTransfrom,
                  borderRadius: commentTemplate.isRounded ? '50%' : '0',
                  filter: 'blur(1px)',
                }}
              />
            ) : null}
            <div
              className='comment__username'
              style={{
                transform: commentTemplate.textTransform,
                filter: 'blur(1px)',
              }}
            >
              {fromUser.first_name} {fromUser.last_name}
            </div>
          </div>
        ))}
      </div>

      <Group>
        <Div>
          Рефералка!! <b>https://vk.com/app51706103#r={userId}</b>
        </Div>
        <Button
          stretched
          size='l'
          mode='secondary'
          onClick={(e) => {
            bridge.send('VKWebAppCopyText', {
              text: `https://vk.com/app51706103#r=${userId}`,
            })
          }}
        >
          Копировать
        </Button>
      </Group>
    </Panel>
  )
}

export default User
