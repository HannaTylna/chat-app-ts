/* eslint-disable react/destructuring-assignment */
import { Message } from '@chat-app/shared'
import { MessageItem } from './MessageItem'

type MessageProps = {
  messages: Message[]
}

export default function MessageList(props: MessageProps) {
  return (
    <div>
      {props.messages.map((messageitem) => {
        // eslint-disable-next-line no-underscore-dangle
        return <MessageItem key={messageitem._id} messageitem={messageitem} />
      })}
    </div>
  )
}
