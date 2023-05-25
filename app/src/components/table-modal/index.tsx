import { Modal, TouchableOpacity, Platform } from 'react-native'
import { ModalBody, Overlay, Header, Form, Input } from './styles'
import { Text } from '../text'
import { Close } from '../Icons/close'
import { Button } from '../button'
import { useState } from 'react'

interface Props {
  visible: boolean
  onClose: () => void
  onSave: (table: string) => void
}

export function TableModal({ visible, onClose, onSave }: Props) {
  const [table, setTable] = useState('')

  function handleSave() {
    setTable('')
    onSave(table)
    onClose()
  }

  return (
    <Modal animationType='fade' visible={visible} transparent>
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input placeholder="Número da mesa" placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable} />
            <Button onPress={handleSave} disabled={table.length === 0}>SALVAR</Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  )
}
