import { FlatList } from 'react-native'
import { useState } from 'react'

import { Text } from '../text'
import { CategoryContainer, Icon } from './styles'
import { Category } from '../../types/category'

interface Props {
  categories: Category[]
  onSelectCategory: (categoryId: string) => Promise<void>
}

export function Categories({ categories, onSelectCategory }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('')

  function handleSelectCategory(id: string) {
    const category = selectedCategory === id ? '' : id

    onSelectCategory(category)
    setSelectedCategory(category)
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id

        return (
          <CategoryContainer
            onPress={() => handleSelectCategory(category._id)}
            key={category._id}
          >
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>

            <Text opacity={isSelected ? 1 : 0.5} size={14} weight="600">
              {category.name}
            </Text>
          </CategoryContainer>
        )
      }}
    />
  )
}
