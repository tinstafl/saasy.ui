import { Modal } from "@heroui/react"
import React from "react"

interface ModalProps {
  isOpen: boolean
  onOpenChange: () => void
  content: React.JSX.Element
}

export default function ModalWrapper({ isOpen, onOpenChange, content }: ModalProps): React.JSX.Element {
  return (
    <Modal size="xl"
           backdrop="blur"
           isOpen={ isOpen }
           isDismissable={ false }
           isKeyboardDismissDisabled={ false }
           onOpenChange={ onOpenChange }
           className="rounded-md"
           classNames={ {
             body: "max-h-[100%] min-h-[100%]",
             wrapper: "max-h-[100%] min-h-[100%]",
             backdrop: "h-[100%] w-[100%]",
             header: "m-2"
           } }
           motionProps={ {
             variants: {
               enter: {
                 y: 0,
                 opacity: 1,
                 transition: {
                   duration: 0.2,
                   ease: "easeOut",
                 },
               },
               exit: {
                 y: -20,
                 opacity: 0,
                 transition: {
                   duration: 0.2,
                   ease: "easeIn",
                 },
               },
             }
           } }>
      { content }
    </Modal>
  )
}
