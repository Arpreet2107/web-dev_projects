import LoginForm from "@/components/auth/LoginForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}

