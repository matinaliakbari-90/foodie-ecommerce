export default function CheckOtpForm() {
    return (
        <div className="form_container">
            <form>
                <div className="mb-3">
                    <label className="form-label">کد ورود</label>
                    <input name="otp" type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary btn-auth">
                    {/* {pending && <span className="spinner-border spinner-border-sm me-2"></span>} */}
                    تایید
                </button>
            </form>
        </div>
    );
}