import Product from "@/components/products/Product";
import ShoppingCart from "@/components/products/ShoppingCart";
import { getFetch } from "@/utils/fetch";
import { getBlurDataURL, numberFormat, salePresent } from "@/utils/Helper";
import Image from "next/image";

interface ProductImageType {
    id: number;
    image: string;
}

interface ProductRandomeType {
    id: number;
    name: string;
    primary_image: string;
    description: string;
    is_sale: boolean;
    sale_price: number;
    price: number;
    slug: string;
    quantity: number;
}

export default async function ProductsPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const product = await getFetch(`/products/${decodeURI(slug)}`);
    const randomeProduct = await getFetch('/random-products?count=4')

    return (
        <>
            <section className="single_page_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="row gy-5">
                                <div className="col-sm-12 col-lg-6">
                                    <h3 className="fw-bold mb-4">{product.name}</h3>
                                    <h5 className="mb-3">
                                        {product.is_sale ? (
                                            <>
                                                <del className="text-danger me-2">{numberFormat(product.price)}</del>
                                                <span className="d-inline-block me-1">{numberFormat(product.sale_price)}</span>
                                                <span className="mr-2">تومان</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{numberFormat(product.price)}</span>
                                                <span style={{ display: 'inline-block', marginRight: '4px' }}>تومان</span>
                                            </>
                                        )}

                                        {product.is_sale && (
                                            <div className="text-secondary fs-6 mt-2">
                                                %{salePresent(product.price, product.sale_price)} تخفیف
                                            </div>
                                        )}
                                    </h5>

                                    <p>{product.description}</p>

                                    <p className="product-quantity">از این محصول <strong>{product.quantity}</strong> تا موجود است.</p>

                                    <ShoppingCart product={product} />
                                    
                                </div>
                                <div className="col-sm-12 col-lg-6">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="0" className="active"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="2"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <Image src={product.primary_image} placeholder="blur" blurDataURL={getBlurDataURL()} width={464} height={309} className="d-block" alt="image-primary" />
                                            </div>
                                            {product.images.map((img: ProductImageType) => (
                                                <div key={img.id} className="carousel-item">
                                                    <Image src={img.image} placeholder="blur" blurDataURL={getBlurDataURL()} width={464} height={309} className="d-block" alt="image-secondary" />
                                                </div>
                                            ))}
                                        </div>
                                        <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            <section className="food_section my-5">
                <div className="container">
                    <div className="row gx-3">
                        {randomeProduct.map((product: ProductRandomeType) => (
                            <div key={product.id} className="col-sm-6 col-lg-3">
                                <Product product={product} />
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    );
}