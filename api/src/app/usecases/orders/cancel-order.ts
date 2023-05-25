import { Request, Response } from 'express'

import { Order } from '../../models/order'


export async function cancelOrder(req: Request, res: Response) {
  try {
    const { id } = req.params

    await Order.findByIdAndDelete(id)

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}
