import { useState, useEffect, useRef } from 'react'

export function useAnimation(visible: boolean, cleanOrder: () => void) {
  const [shouldRender, setShouldRender] = useState(visible)
  const animatedElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
    }

    const handleAnimationEnd = () => {
      setShouldRender(false)
      cleanOrder()
    }

    const elementRef = animatedElementRef.current

    if (!visible && elementRef) {

      elementRef.addEventListener('animationend', handleAnimationEnd)
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd)
      }
    }
  }, [visible])

  return { shouldRender, animatedElementRef }
}
