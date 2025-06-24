import { getBlurDataURL, numberFormat } from "@/utils/Helper";
import Image from "next/image";
import Link from "next/link";

interface ProductType {
    product: {
        id: number;
        name: string;
        primary_image: string;
        description: string;
        is_sale: boolean;
        sale_price: number;
        price: number;
        slug: string;
    }
}

export default function Product({ product }: ProductType) {
    return (
        <div className="box">
            <div>
                <Link href={`/products/${decodeURI(product.slug)}`} className="img-box">
                    <Image className="img-fluid" placeholder="blur" blurDataURL={getBlurDataURL()} width={370} height={200} src={product.primary_image} alt="primary-image" />
                </Link>
                <div className="detail-box">
                    <h5>
                        <Link href={`/products/${decodeURI(product.slug)}`}>
                            {product.name}
                        </Link>
                    </h5>
                    <p>{product.description}</p>
                    <div className="options">
                        {product.is_sale ? (
                            <h6>
                                <span>{numberFormat(product.sale_price)}</span>
                                <del className="me-2 text-danger">{numberFormat(product.price)}</del>
                                <span style={{ marginRight: '4px' }}>تومان</span>
                            </h6>
                        ) : (
                            <h6>
                                {numberFormat(product.price)}
                                <span style={{ marginRight: '4px' }}>تومان</span>
                            </h6>
                        )}

                        <a href="">
                            <i className="bi bi-cart-fill text-white fs-5"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}