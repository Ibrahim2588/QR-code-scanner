import { useCallback, useState } from 'react'

export const useDisclose = (initialValue) => {
    const [open, setOpen] = useState(initialValue | false)

    const onOpen = useCallback(() => {
        setOpen(true)
    }, [])

    const onClose = useCallback(() => {
        setOpen(false)
    }, [])

    const toggle = useCallback(() => {
        setOpen(!open)
    }, [open])

    return {
        open,
        close: !open,
        onOpen,
        onClose,
        toggle,
    }
}
