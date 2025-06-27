import { getFetch } from "@/utils/fetch";
import { numberFormat } from "@/utils/Helper";
import { cookies } from "next/headers";
import Paginate from "./Paginate";
import Link from "next/link";


interface TransactionType {
    id: number;
    order_id: number;
    amount: number;
    status: string;
    trans_id: string;
    created_at: string;
}

export default async function Table({ params }: { params: string }) {

    const tokens = (await cookies()).get('tokens')
    const data = await getFetch(`/profile/transactions?${params}`, { "Authorization": `Bearer ${tokens?.value}` })

    return (
        <>
            {data.transactions.length !== 0 ? (
                <>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>شماره سفارش</th>
                                    <th>مبلغ</th>
                                    <th>وضعیت</th>
                                    <th>شماره پیگیری</th>
                                    <th>تاریخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.transactions.map((transaction: TransactionType) => (
                                    <tr key={transaction.id}>
                                        <th>{transaction.order_id}</th>
                                        <td>{numberFormat(transaction.amount)} تومان</td>
                                        <td>
                                            <span className={transaction.status === 'موفق' ? "text-success" : 'text-danger'}>{transaction.status}</span>
                                        </td>
                                        <td>{transaction.trans_id === null ? '-' : transaction.trans_id}</td>
                                        <td>{transaction.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Paginate links={data.meta.links} />
                </>
            ) : (
                <div className="d-flex flex-column align-items-center py-5">
                    <i className="bi bi-receipt fs-1 text-muted"></i>
                    <p className="mt-3 fs-5 text-secondary">هیچ تراکنشی ثبت نشده است</p>
                    <Link href="/menu" className="btn btn-outline-primary">
                        <i className="bi bi-shop me-2"></i>
                        مشاهده محصولات
                    </Link>
                </div>
            )}
        </>
    );
}