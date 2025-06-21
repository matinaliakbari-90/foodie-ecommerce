import Image from "next/image";
import Link from "next/link";

interface ProductTabType {
    tabList: string[];
    tabPanel: {
        id: number;
        name: string;
        primary_image: string;
        description: string;
        is_sale: boolean;
        sale_price: number;
        price: number;
    }[][];
}



export default function ProductsTab({ tabList, tabPanel }: ProductTabType) {
    return (
        <section className="food_section layout_padding-bottom">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        منو محصولات
                    </h2>
                </div>

                <ul className="filters_menu">
                    {tabList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <div className="filters-content">
                    <div className="row grid">
                        {tabPanel.map((product, index) => (
                            <div key={index} className="col-sm-6 col-lg-4">
                                {product.map(item => (
                                    <div key={item.id} className="box">
                                        <div>
                                            <div className="img-box">
                                                <Image className="img-fluid" width={370} height={200} src={item.primary_image} alt="primary-image" />
                                            </div>
                                            <div className="detail-box">
                                                <h5>{item.name}</h5>
                                                <p>{item.description}</p>
                                                <div className="options">
                                                    {item.is_sale ? (
                                                        <h6>
                                                            <span>{item.sale_price}</span>
                                                            <del className="me-2 text-danger">{item.price}</del>
                                                            <span style={{ marginRight: '4px' }}>تومان</span>
                                                        </h6>
                                                    ) : (
                                                        <h6>
                                                            {item.price}
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
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="btn-box">
                    <Link href="/menu">
                        مشاهده بیشتر
                    </Link>
                </div>
            </div>
        </section>
    );
}