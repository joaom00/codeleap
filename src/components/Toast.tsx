import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { Cross2Icon } from '@radix-ui/react-icons'
import { CheckMarkIcon } from './CheckMarkIcon'
import { ErrorIcon } from './ErrorIcon'

type ToastContextValue = ((payload: ToastDispatchPayload) => void) & {
  success: (payload: ToastDispatchPayload) => void
  error: (payload: ToastDispatchPayload) => void
}

type ToastContextImplValue = {
  toastElementsMapRef: React.MutableRefObject<Map<string, HTMLLIElement>>
  sortToasts: () => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)
const ToastContextImpl = React.createContext<ToastContextImplValue | undefined>(undefined)

const ANIMATION_OUT_DURATION = 350

type ToastStatus = 'default' | 'success' | 'error'
type ToastDispatchPayload = {
  type?: 'foreground' | 'background'
  duration?: number
  title: string
  description?: string
}
type Toast = ToastDispatchPayload & {
  status: ToastStatus
  open: boolean
}

type ToastsProps = {
  children: React.ReactNode
}
export const Toasts = ({ children, ...props }: ToastsProps) => {
  const [toasts, setToasts] = React.useState<Map<string, Toast>>(new Map())
  const toastElementsMapRef = React.useRef<Map<string, HTMLLIElement>>(new Map())
  const viewportRef = React.useRef<HTMLOListElement>(null)

  const sortToasts = React.useCallback(() => {
    const toastElements = Array.from(toastElementsMapRef.current).reverse()
    const heights: number[] = []

    toastElements.forEach(([, toast], index) => {
      if (!toast) return
      const height = toast.clientHeight
      heights.push(height)
      const frontToastHeight = heights[0]
      toast.setAttribute('data-front', `${index === 0}`)
      toast.setAttribute('data-hidden', `${index > 2}`)
      toast.style.setProperty('--index', `${index}`)
      toast.style.setProperty('--height', `${height}px`)
      toast.style.setProperty('--front-height', `${frontToastHeight}px`)
      const hoverOffsetY = heights.slice(0, index).reduce((res, next) => (res += next), 0)
      toast.style.setProperty('--hover-offset-y', `-${hoverOffsetY}px`)
    })
  }, [])

  const handleAddToast = React.useCallback((toast: Omit<Toast, 'open'>) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts)
      newMap.set(String(Date.now()), { ...toast, open: true })
      return newMap
    })
  }, [])

  const handleRemoveToast = React.useCallback((key: string) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts)
      newMap.delete(key)
      return newMap
    })
  }, [])

  const handleDispatchDefault = React.useCallback(
    (payload: ToastDispatchPayload) => handleAddToast({ ...payload, status: 'default' }),
    [handleAddToast],
  )

  const handleDispatchSuccess = React.useCallback(
    (payload: ToastDispatchPayload) => handleAddToast({ ...payload, status: 'success' }),
    [handleAddToast],
  )

  const handleDispatchError = React.useCallback(
    (payload: ToastDispatchPayload) => handleAddToast({ ...payload, status: 'error' }),
    [handleAddToast],
  )

  React.useEffect(() => {
    const viewport = viewportRef.current

    if (viewport) {
      const handleFocus = () => {
        toastElementsMapRef.current.forEach((toast) => {
          toast.setAttribute('data-hovering', 'true')
        })
      }

      const handleBlur = (event: PointerEvent | FocusEvent) => {
        const target = event.target as HTMLElement
        if (!viewport.contains(target) || viewport === event.target) {
          toastElementsMapRef.current.forEach((toast) => {
            toast.setAttribute('data-hovering', 'false')
          })
        }
      }

      viewport.addEventListener('pointermove', handleFocus)
      viewport.addEventListener('pointerleave', handleBlur)
      viewport.addEventListener('focusin', handleFocus)
      viewport.addEventListener('focusout', handleBlur)
      return () => {
        viewport.removeEventListener('pointermove', handleFocus)
        viewport.removeEventListener('pointerleave', handleBlur)
        viewport.removeEventListener('focusin', handleFocus)
        viewport.removeEventListener('focusout', handleBlur)
      }
    }
  }, [])

  return (
    <ToastContext.Provider
      value={React.useMemo(
        () =>
          Object.assign(handleDispatchDefault, {
            success: handleDispatchSuccess,
            error: handleDispatchError,
          }),
        [handleDispatchDefault, handleDispatchSuccess, handleDispatchError],
      )}
    >
      <ToastContextImpl.Provider
        value={React.useMemo(
          () => ({
            toastElementsMapRef,
            sortToasts,
          }),
          [sortToasts],
        )}
      >
        <ToastPrimitive.Provider {...props}>
          {children}
          {Array.from(toasts).map(([key, toast]) => (
            <Toast
              key={key}
              id={key}
              toast={toast}
              onOpenChange={(open) => {
                if (!open) {
                  toastElementsMapRef.current.delete(key)
                  sortToasts()
                  if (!open) {
                    setTimeout(() => {
                      handleRemoveToast(key)
                    }, ANIMATION_OUT_DURATION)
                  }
                }
              }}
            />
          ))}
          <ToastPrimitive.Viewport ref={viewportRef} className="ToastViewport" />
        </ToastPrimitive.Provider>
      </ToastContextImpl.Provider>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (context) return context
  throw new Error('useToast must be used within Toasts')
}
export const useToastContext = () => {
  const context = React.useContext(ToastContextImpl)
  if (context) return context
  throw new Error('useToast must be used within Toasts')
}

type ToastProps = {
  id: string
  onOpenChange: (open: boolean) => void
  toast: Toast
}
const Toast = (props: ToastProps) => {
  const { onOpenChange, toast, id, ...toastProps } = props
  const ref = React.useRef<HTMLLIElement>(null)
  const context = useToastContext()
  const { sortToasts, toastElementsMapRef } = context
  const toastElementsMap = toastElementsMapRef.current

  React.useLayoutEffect(() => {
    if (ref.current) {
      toastElementsMap.set(id, ref.current)
      sortToasts()
    }
  }, [id, sortToasts, toastElementsMap])

  return (
    <ToastPrimitive.Root
      {...toastProps}
      ref={ref}
      type={toast.type}
      duration={toast.duration}
      className="ToastRoot"
      onOpenChange={onOpenChange}
    >
      <div className="ToastInner" data-status={toast.status}>
        <ToastStatusIcon status={toast.status} />
        <ToastPrimitive.Title className="ToastTitle">
          <p>{toast.title}</p>
        </ToastPrimitive.Title>
        {toast.description && (
          <ToastPrimitive.Description className="ToastDescription">
            {toast.description}
          </ToastPrimitive.Description>
        )}
        <ToastPrimitive.Close aria-label="Close" className="ToastClose">
          <Cross2Icon />
        </ToastPrimitive.Close>
      </div>
    </ToastPrimitive.Root>
  )
}

type ToastStatusIconProps = {
  status: ToastStatus
}
const ToastStatusIcon = ({ status }: ToastStatusIconProps) => {
  return status !== 'default' ? (
    <div style={{ gridArea: 'icon', alignSelf: 'start' }}>
      {status === 'success' && <CheckMarkIcon />}
      {status === 'error' && <ErrorIcon />}
    </div>
  ) : null
}
