export default function ProfilePage() {
    return (
        <form className="vh-70">
            <div className="row g-4">
                <div className="col col-md-6">
                    <label className="form-label">نام و نام خانوادگی</label>
                    <input type="text" className="form-control" value="لورم ایپسوم" />
                </div>
                <div className="col col-md-6">
                    <label className="form-label">ایمیل</label>
                    <input type="text" className="form-control" value="test@gmail.com" />
                </div>
                <div className="col col-md-6">
                    <label className="form-label">شماره تلفن</label>
                    <input type="text" disabled className="form-control" value="09100000000" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4">ویرایش</button>
        </form>
    );
}