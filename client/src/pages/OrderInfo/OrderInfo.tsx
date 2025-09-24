import { useParams } from "react-router";
import useGetOrderInfo from "../../hooks/orders/useGetOrderInfo";

const OrderInfo = () => {
  const { orderId } = useParams();

  const { data, isLoading, error } = useGetOrderInfo(orderId!);

  if (isLoading)
    return <p className="text-center text-[#f5f5dc]/80">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Something went wrong</p>;

  return (
    <div className="max-w-5xl m-auto p-6 bg-[#2B2118]/20 backdrop-blur-md border border-[#6C584C]/30 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#f5f5dc]">
        Order Details
      </h2>

      <table className="w-full bg-[#2B2118]/50 backdrop-blur-md text-[#F5EDE0] rounded-xl ">
        <thead className="bg-[#3D2C22]/70 text-[#E6D5C3]">
          <tr>
            <th className="px-4 py-2 border border-[#6C584C]/40">Title</th>
            <th className="px-4 py-2 border border-[#6C584C]/40">Price</th>
            <th className="px-4 py-2 border border-[#6C584C]/40">Quantity</th>
            <th className="px-4 py-2 border border-[#6C584C]/40">Image</th>
          </tr>
        </thead>
        <tbody>
          {data?.books.map((book) => (
            <tr
              key={book.book}
              className="border-b border-[#6C584C]/30 hover:bg-[#3D2C22]/40 text-white"
            >
              <td className="px-4 py-2 border border-[#6C584C]/40 font-medium">
                {book.title}
              </td>
              <td className="px-4 py-2 border border-[#6C584C]/40">
                ${book.price}
              </td>
              <td className="px-4 py-2 border border-[#6C584C]/40">
                {book.quantity}
              </td>
              <td className="px-4 py-2 border border-[#6C584C]/40">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-16 h-20 rounded-md mx-auto shadow-md"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-lg font-semibold text-right mt-6 text-[#f5f5dc]">
        Subtotal: ${data?.subTotal}
      </h3>
    </div>
  );
};

export default OrderInfo;
