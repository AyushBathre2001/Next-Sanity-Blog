import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getNavLogo } from "@/services/nav/api";
import { urlForImage } from "@/lib/sanity/image";

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  const res = await getNavLogo();
  const logo = urlForImage(res?.logo);
  return (
    <>
      <Navbar logo={logo?.src} />

      <div>{children}</div>

      <Footer {...settings} />
    </>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
