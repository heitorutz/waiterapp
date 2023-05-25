import ReactDOM from 'react-dom'

interface Props {
  containerID: string
  children: JSX.Element
}

export function Portal({ containerID, children }: Props) {
  let container = document.getElementById(containerID)

  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', containerID)
    document.body.appendChild(container)
  }

  return ReactDOM.createPortal(children, container)
}
