import Link from "next/link";
import Product from "./Product";

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
                        {tabPanel.map((items, index) => (
                            <div key={index} className="col-sm-6 col-lg-4">
                                {items.map(product => (
                                    <Product key={product.id} product={product} />
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