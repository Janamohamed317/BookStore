import { useParams } from 'react-router'
import useGetOrderInfo from '../../hooks/orders/useGetOrderInfo'

const OrderInfo = () => {
  const { orderId } = useParams()

  const { data, isLoading, error } = useGetOrderInfo(orderId!)

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
  if (error) return <p className="text-center text-red-500">Something went wrong</p>

  return (
    <div className="max-w-5xl m-auto p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Order Details
      </h2>

      <table className="w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Image</th>
          </tr>
        </thead>
        <tbody>
          {data?.books.map((book) => (
            <tr
              key={book.book}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              <td className="px-4 py-2 border font-medium">{book.title}</td>
              <td className="px-4 py-2 border">${book.price}</td>
              <td className="px-4 py-2 border">{book.quantity}</td>
              <td className="px-4 py-2 border">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-16 h-20  rounded-md mx-auto"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-lg font-semibold text-right mt-6 text-gray-800">
        Subtotal: ${data?.subTotal}
      </h3>
    </div>
  )
}

export default OrderInfo
