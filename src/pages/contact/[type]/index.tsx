import React from "react";
import { useRouter } from "next/router";
import CtaForm from "~/components/CtaForm";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

const Index = () => {
  const router = useRouter();
  const category = Array.isArray(router.query.type)
    ? router.query.type[0]
    : router.query.type;

  // Ensure category is defined before rendering CtaForm
  if (!category) {
    return null; // or some fallback UI
  }

  return (
    <div>
      <Navbar />
      <div className="mt-20 flex flex-col items-center">
        <div className="mb-10">
          <h3 className="pt-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0">
            {category} Form!
          </h3>
          <p className="text-center text-neutral lg:text-lg">
            Fill out the form and Inshallah we will get back to you soon
          </p>
        </div>
        <CtaForm category={category} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
