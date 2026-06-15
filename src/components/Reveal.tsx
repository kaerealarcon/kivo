import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  from?: 'bottom' | 'left' | 'right' | 'fade'
}

export default function Reveal({ children, delay = 0, className = '', style, from = 'bottom' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hiddenTransform = {
    bottom: 'translateY(36px)',
    left:   'translateX(-36px)',
    right:  'translateX(36px)',
    fade:   'none',
  }[from]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translate(0)' : hiddenTransform,
        transition: `opacity 0.75s ease-out ${delay}ms, transform 0.75s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
