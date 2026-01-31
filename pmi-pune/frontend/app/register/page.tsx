import RegistrationForm from "@/components/auth/RegistrationForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}

