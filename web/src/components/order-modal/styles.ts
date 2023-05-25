import styled, { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`
const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

export const Overlay = styled.div<{ isLeaving: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed;
  animation: ${fadeIn} 0.3s forwards;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.2s forwards;
    `}
`
export const ModalBody = styled.div`
  background-color: #fff;
  width: 480px;
  border-radius: 8px;
  padding: 32px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    button {
      line-height: 0;
      border: 0;
      background-color: transparent;
    }
  }

  .status-container {
    margin-top: 32px;

    small {
      font-size: 14px;
      opacity: 0.8;
    }

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
  }
`

export const OrderDetails = styled.div`
  margin-top: 32px;

  > strong {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }

  .order-items {
    margin-top: 16px;

    .item {
      display: flex;

      & + & {
        margin-top: 16px;
      }

      img {
        border-radius: 6px;
      }

      .quantity {
        font-size: 14px;
        color: #666;
        display: block;
        min-width: 20px;
        margin-left: 12px;
      }

      .product-details {
        margin-left: 4px;

        strong {
          display: block;
          margin-bottom: 4px;
        }

        span {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;

    span {
      font-weight: 500;
      font-size: 14px;
      opacity: 0.8;
    }
  }
`
export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    background: #333;
    border-radius: 48px;
    border: 0;
    color: #fff;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .secondary {
    padding: 12px 24px;
    color: #D73035;
    font-weight: bold;
    border: 0;
    background-color: transparent;
    margin-top: 12px;
  }
`
