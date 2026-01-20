import TransferPage from "@/components/services-page/transfer-page";
import InstructorPage from "@/components/services-page/instructor-page";
import PetPage from "@/components/services-page/pet-page";
import CoffeePage from "@/components/services-page/coffee-page";
import RentalPage from "@/components/services-page/rental-page";
import ChildrenPage from "@/components/services-page/children-page";
import CleaningPage from "@/components/services-page/cleaning-page";
import DeliveryPage from "@/components/services-page/delivery-page";

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const toSelectService = () => {
    const services = {
      transfer: <TransferPage />,
      instructor: <InstructorPage />,
      pet: <PetPage />,
      coffee: <CoffeePage />,
      rental: <RentalPage />,
      children: <ChildrenPage />,
      cleaning: <CleaningPage />,
      delivery: <DeliveryPage />,
    };

    return services[slug] || "Такой услуги не найдено";
  };
  return <>{toSelectService()}</>;
}
