import { getBlurDataURL, numberFormat } from "@/utils/Helper";
import Image from "next/image";
import Paginate from "./Paginate";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";


interface OrderType {
    id: number;
    address_title: string;
    status: string;
    payment_status: string;
    paying_amount: number;
    created_at: string;
    order_items: Array<{
        id: number;
        product_primary_image: string;
        product_name: string;
        price: number;
        quantity: number;
        subtotal: number;
    }>
}

export default async function Table({ params }: { params: string }) {

    const tokens = (await cookies()).get('tokens')
    const data = await getFetch(`/profile/orders?${params}`, { "Authorization": `Bearer ${tokens?.value}` })

    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>شماره سفارش</th>
                            <th>آدرس</th>
                            <th>وضعیت</th>
                            <th>وضعیت پرداخت</th>
                            <th>قیمت کل</th>
                            <th>تاریخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.orders.map((order: OrderType) => (
                            <tr key={order.id}>
                                <th>{order.id}</th>
                                <td>{order.address_title}</td>
                                <td>{order.status}</td>
                                <td>
                                    <span className={order.payment_status === 'موفق' ? 'text-success' : 'text-danger'}>{order.payment_status}</span>
                                </td>
                                <td>{numberFormat(order.paying_amount)}</td>
                                <td>{order.created_at}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target={`#modal-${order.id}`}>
                                        محصولات
                                    </button>
                                    <div className="modal fade" id={`modal-${order.id}`}>
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h6 className="modal-title">محصولات سفارش
                                                        شماره {order.id}</h6>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <table className="table align-middle">
                                                        <thead>
                                                            <tr>
                                                                <th>محصول</th>
                                                                <th>نام</th>
                                                                <th>قیمت</th>
                                                                <th>تعداد</th>
                                                                <th>قیمت کل</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.order_items.map(item => (
                                                                <tr key={item.id}>
                                                                    <th>
                                                                        <Image src={item.product_primary_image} placeholder="blur" blurDataURL={getBlurDataURL()} width={80} height={43} alt="item-order-image" />
                                                                    </th>
                                                                    <td className="fw-bold">{item.product_name}</td>
                                                                    <td>{numberFormat(item.price)} تومان</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{numberFormat(item.subtotal)} تومان</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <Paginate links={data.meta.links} />
        </>
    );
}