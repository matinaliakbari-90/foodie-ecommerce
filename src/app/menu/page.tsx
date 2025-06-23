import Categories from "@/components/menu/Categories";
import ProductsList from "@/components/menu/ProductsList";
import Search from "@/components/menu/Search";
import { getFetch } from "@/utils/fetch";

export default async function MenuPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const categories = await getFetch('/categories')
    const params = new URLSearchParams()

    if (searchParams.page) {
        params.set('page', searchParams.page.toString())
    }

    if (searchParams.search) {
        params.set("search", searchParams.search.toString());
    }

    if (searchParams.category) {
        params.set('category', searchParams.category.toString())
    }

    return (
        <section className="food_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <Search />

                        <hr />

                        <Categories categories={categories} />

                        <hr />

                        <div>
                            <label className="form-label">مرتب سازی</label>
                            <div className="form-check my-2">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                <label className="form-check-label cursor-pointer">
                                    بیشترین قیمت
                                </label>
                            </div>
                            <div className="form-check my-2">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                <label className="form-check-label cursor-pointer">
                                    کمترین قیمت
                                </label>
                            </div>
                            <div className="form-check my-2">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                <label className="form-check-label cursor-pointer">
                                    پرفروش ترین
                                </label>
                            </div>
                            <div className="form-check my-2">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                <label className="form-check-label cursor-pointer">
                                    با تخفیف
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-lg-9">
                        <ProductsList params={params.toString()} />
                    </div>
                </div>
            </div>
        </section>
    );
}