import axios from 'axios'
import { fetchMessages } from './ChatRoomPage'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('test fetch messages successful', () => {
  it('Should return messages', async () => {
    const mockFakeTodoItem = {
      data: [
        { sender: 'somedude', text: 'text1' },
        { sender: 'user2', text: 'text2' },
      ],
    }
    mockedAxios.get.mockResolvedValueOnce(mockFakeTodoItem)

    const result = await fetchMessages()
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/messages/')
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockFakeTodoItem.data)
  })
})
