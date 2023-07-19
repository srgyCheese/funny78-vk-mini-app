import React, { MouseEventHandler } from "react"
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
} from "@vkontakte/vkui"
import { UserInfo } from "@vkontakte/vk-bridge"
import { trpc } from "../utils/trpc"

interface Props {
  id: string
  go: MouseEventHandler<HTMLElement>
  fetchedUser?: UserInfo
}

const Home: React.FC<Props> = ({ id, go, fetchedUser }) => {
  const testQuery = trpc.test.useQuery()
  const profileQuery = trpc.profile.useQuery()

  if (profileQuery.isLoading) {
    return <Panel id={id}></Panel>
  }

  return (
    <Panel id={id}>
      <PanelHeader>Самый адекватный пользователь</PanelHeader>
      {profileQuery.data?.photo_400 ? <img src={profileQuery.data.photo_400} /> : 'Поставь фото, дурашка'}

      {fetchedUser && (
        <Group
          header={
            <Header mode="secondary">User Data Fetched with VK Bridge</Header>
          } 
        >
          <Cell
            before={
              fetchedUser.photo_200 ? (
                <Avatar src={fetchedUser.photo_200} />
              ) : null
            }
            subtitle={
              fetchedUser.city && fetchedUser.city.title
                ? fetchedUser.city.title
                : ""
            }
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
      )}

      {testQuery.isLoading ? 'loading...' : testQuery.data}

      <Group header={<Header mode="secondary">Странички</Header>}>
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={go}
            data-to="persik"
          >
            Персик
          </Button>
        </Div>
      </Group>
    </Panel>
  )
}

export default Home
