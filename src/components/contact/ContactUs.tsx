export default function ContactMe() {
    return (
        <section className="book_section layout_padding">
            <div className="container">
                <div className="heading_container">
                    <h2>
                        تماس با ما
                    </h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form_container">
                            <form action="">
                                <div>
                                    <input type="text" className="form-control" placeholder="نام و نام خانوادگی" />
                                </div>
                                <div>
                                    <input type="email" style={{ direction: "rtl" }} className="form-control" placeholder="ایمیل" />
                                </div>
                                <div>
                                    <input type="text" className="form-control" placeholder="موضوع پیام" />
                                </div>
                                <div>
                                    <textarea rows={10} style={{ height: '100px' }} className="form-control"
                                        placeholder="متن پیام">
                                    </textarea>
                                </div>
                                <div className="btn_box">
                                    <button>
                                        ارسال پیام
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="map_container ">
                            <div id="map" style={{ height: "345px" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}