import { FlatList } from 'react-native'
import { Text } from '../text'
import {
  ProductImage,
  ProductContainer,
  ProductDetails,
  Separator,
  AddToCartButton,
} from './styles'
import { formatCurrency } from '../../utils/format-currency'
import { PlusCircle } from '../Icons/plus-circle'
import { ProductModal } from '../product-modal'
import { useState } from 'react'
import { Product } from '../../types/product'

interface Props {
  onAddToCart: (product: Product) => void
  products: Product[]
}

export function Menu({ onAddToCart, products }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  function handleOpenModal(product: Product) {
    setIsModalVisible(true)
    setSelectedProduct(product)
  }

  return (
    <>
      <ProductModal
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        visible={isModalVisible}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.1.4:3001/uploads/${product.imagePath}`,
              }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  )
}
