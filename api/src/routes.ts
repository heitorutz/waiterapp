import path from 'node:path'

import { Router } from 'express'
import multer from 'multer'

import { listCategories } from './app/usecases/categories/list-categories'
import { createCategory } from './app/usecases/categories/create-category'
import { listProducts } from './app/usecases/products/list-products'
import { createProduct } from './app/usecases/products/create-product'
import { listProductsByCategory } from './app/usecases/categories/list-products-by-categories'
import { listOrders } from './app/usecases/orders/list-orders'
import { createOrder } from './app/usecases/orders/create-order'
import { changeOrderStatus } from './app/usecases/orders/change-order-status'
import { cancelOrder } from './app/usecases/orders/cancel-order'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  }),
})

router.get('/categories', listCategories)

router.post('/categories', createCategory)

router.get('/products', listProducts)

router.post('/products', createProduct)

router.get('/categories/:id/products', listProductsByCategory)

router.get('/orders', listOrders)

router.post('/orders', createOrder)

router.patch('/orders/:id', changeOrderStatus)

router.delete('/orders/:id', cancelOrder)
