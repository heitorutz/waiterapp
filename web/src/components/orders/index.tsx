import { useEffect, useState } from 'react'
import { OrdersBoard } from '../orders-board'
import { Container } from './styles'
import { Order } from '../../types/order'
import { api } from '../../utils/api'

import socketIo from 'socket.io-client'

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    })

    socket.on('orders@new', (order) => {
      setOrders((prevState) => prevState.concat(order))
    })
  }, [])

  useEffect(() => {
    api.get('/orders').then(({ data }) => {
      setOrders(data)
    })
  }, [])

  const wainting = orders.filter((order) => order.status === 'WAITING')
  const inProduction = orders.filter(
    (order) => order.status === 'IN_PRODUCTION'
  )
  const done = orders.filter((order) => order.status === 'DONE')

  function handleDeleteOrder(orderId: string) {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderId)
    )
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    )
  }

  return (
    <Container>
      <OrdersBoard
        onDeleteOrder={handleDeleteOrder}
        icon="🕰️"
        title="Fila de espera"
        orders={wainting}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        onDeleteOrder={handleDeleteOrder}
        icon="🧑‍🍳"
        title="Em preparação"
        orders={inProduction}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        onDeleteOrder={handleDeleteOrder}
        icon="✅"
        title="Pronto!"
        orders={done}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  )
}
