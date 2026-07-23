'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Categoria } from './columns'
import CategoriaForm from './CategoriaForm'

type Props = {
    isOpen: boolean
    onClose: () => void
    categoria: Categoria | null
}

export default function CategoriaModal({
    isOpen,
    onClose,
    categoria
}: Props) {

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        Nueva categoria
                    </DialogTitle>
                </DialogHeader>

                <CategoriaForm categoria={categoria} onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}