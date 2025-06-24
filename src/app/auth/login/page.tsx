import CheckOtpForm from "@/components/auth/CheckOtpForm";
import LoginForm from "@/components/auth/LoginForm";
import { useState } from "react";

export default function LoginPage() {

    const [step, setStep] = useState(1)

    return (
        <section className="auth_section book_section">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4 offset-md-4">
                        <div className="card">
                            <div className="card-body">
                                <LoginForm setStep={setStep} />

                                <CheckOtpForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}