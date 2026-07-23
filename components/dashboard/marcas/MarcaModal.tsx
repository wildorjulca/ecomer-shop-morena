'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import MarcaForm from './MarcaForm'
import { Marca } from './columns'
// import MarcaForm from './MarcaForm'

type Props = {
    isOpen: boolean
    onClose: () => void
    marca: Marca | null
}

export default function MarcaModal({
    isOpen,
    onClose,
    marca
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
                        Nueva marca
                    </DialogTitle>
                </DialogHeader>

                <MarcaForm marca={marca} onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}