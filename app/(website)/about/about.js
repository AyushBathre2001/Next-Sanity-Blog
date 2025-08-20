import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import Image from "next/image";
import Link from "next/link";

export default function About({ about }) {
  const imageProps = urlForImage(about?.image) || null;
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        {about?.title}
      </h1>
      <div className="text-center">
        <p className="text-lg">{about?.sub_title}</p>
      </div>

      <div className="relative mx-auto mt-8 h-[400px] w-full max-w-screen-md overflow-hidden rounded-md">
        {imageProps && (
          <Image
            src={imageProps?.src}
            alt={"image"}
            fill
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <PortableText value={about?.description} />
        <p>
          <Link href="/contact">{about?.bottom_btn}</Link>
        </p>
      </div>
    </Container>
  );
}
