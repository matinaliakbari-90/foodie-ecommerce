import { getFetch } from "@/utils/fetch";
import Product from "../products/Product";
import Paginate from "./Paginate";


interface ProductType {
    id: number;
    name: string;
    primary_image: string;
    description: string;
    is_sale: boolean;
    sale_price: number;
    price: number;
}

export default async function ProductsList({ params }: { params: string }) {

    const data = await getFetch(`/menu?${params}`);

    return (
        <>
            <div className="row gx-3">
                {data.products.map((product: ProductType) => (
                    <div key={product.id} className="col-sm-6 col-lg-4">
                        <Product product={product} />
                    </div>
                ))}
            </div>

            <Paginate links={data.meta.links} />
        </>
    );
}