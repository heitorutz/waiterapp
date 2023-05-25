import { ActivityIndicator } from 'react-native'
import { Text } from '../text'
import { Container } from './styles'

interface Props {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ children, onPress, disabled, loading}: Props) {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>

      {!loading && (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}

      {loading && (
        <ActivityIndicator color='#fff' />
      )}


    </Container>
  )
}
