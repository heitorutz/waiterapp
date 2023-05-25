import { useAnimation } from '../../hooks/use-animation'
import { Portal } from '../portal'
import { Overlay, ModalBody, OrderDetails, Actions } from './styles'
import closeIcon from '../../assets/images/close-icon.svg'
import { Order } from '../../types/order'
import { formatCurrency } from '../../utils/format-currency'
import { useEffect } from 'react'

interface Props {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCleanOrder: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeOrderStatus: () => void;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCleanOrder,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus
}: Props) {
  const { shouldRender, animatedElementRef } = useAnimation(
    visible,
    onCleanOrder
  )

  useEffect(() => {
    function handleKeyDow(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDow)

    return () => {
      document.removeEventListener('keydown', handleKeyDow)
    }
  }, [onClose])

  if (!shouldRender || !order) {
    return null
  }

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity
  }, 0)

  return (
    <Portal containerID="order-modal">
      <Overlay ref={animatedElementRef} isLeaving={!visible}>
        <ModalBody>
          <header>
            <strong>Mesa {order.table}</strong>

            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="Close Icon" />
            </button>
          </header>

          <div className="status-container">
            <small>Status do Pedido</small>
            <div>
              <span>
                {order.status === 'WAITING' && '🕰️'}
                {order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
                {order.status === 'DONE' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Fila de espera'}
                {order.status === 'IN_PRODUCTION' && 'Em preparação'}
                {order.status === 'DONE' && 'Pronto!'}
              </strong>
            </div>
          </div>

          <OrderDetails>
            <strong>Itens</strong>
            <div className="order-items">
              {order.products.map(({ _id, product, quantity }) => (
                <div className="item" key={_id}>
                  <img
                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                    alt={product.name}
                    width={'56'}
                    height={'28.51'}
                  />

                  <span className="quantity">{quantity}</span>

                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </OrderDetails>

          <Actions>
            {order.status !== 'DONE' && (
              <button onClick={onChangeOrderStatus} disabled={isLoading} type="button" className="primary">
                <span>
                  {order.status === 'WAITING' && '🧑‍🍳'}
                  {order.status === 'IN_PRODUCTION' && '✅'}
                </span>
                <strong>
                  {order.status === 'WAITING' && 'Iniciar Produção'}
                  {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
                </strong>
              </button>
            )}

            <button
              disabled={isLoading}
              onClick={onCancelOrder}
              type="button"
              className="secondary"
            >
              <strong>Cancelar pedido</strong>
            </button>
          </Actions>
        </ModalBody>
      </Overlay>
    </Portal>
  )
}
