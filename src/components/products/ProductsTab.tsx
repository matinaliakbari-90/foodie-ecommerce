'use client';

import Link from "next/link";
import Product from "./Product";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from "react";

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

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, []);

    if (!isClient) return null;


    return (
        <section className="food_section layout_padding-bottom">
            <Tabs selectedTabClassName="active" className="container">
                <div className="heading_container heading_center">
                    <h2>
                        منو محصولات
                    </h2>
                </div>

                <TabList className="filters_menu">
                    {tabList.map((list, index) => (
                        <Tab key={index}>{list}</Tab>
                    ))}
                </TabList>

                <div className="filters-content">
                    {tabPanel.map((panel, index) => (
                        <TabPanel key={index} className="row grid">
                            {panel.map(product => (
                                <div key={product.id} className="col-sm-6 col-lg-4">
                                    <Product product={product} />
                                </div>
                            ))}
                        </TabPanel>
                    ))}
                </div>

                <div className="btn-box">
                    <Link href="/menu">
                        مشاهده بیشتر
                    </Link>
                </div>
            </Tabs>
        </section>
    );
}